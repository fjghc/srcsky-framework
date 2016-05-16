/**
 * 宝龙电商
 * com.srcsky.autoconfigure
 * ClusterHttpSessionAutoConfiguration.java
 * <p>
 * 2016-03-08
 * 2016宝龙公司-版权所有
 */
package com.srcskyframework.starter.session;

import com.srcskyframework.core.exception.LogicException;
import com.srcskyframework.core.support.ConfigHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.session.data.redis.RedisOperationsSessionRepository;
import org.springframework.session.data.redis.config.ConfigureNotifyKeyspaceEventsAction;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.web.http.CookieHttpSessionStrategy;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.HttpSessionStrategy;
import org.springframework.util.StringUtils;

import java.util.Arrays;

/**
 * SessionAutoConfiguration
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:11
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
@Configuration
@ConditionalOnClass(org.springframework.session.data.redis.config.annotation.web.http.RedisHttpSessionConfiguration.class)
@ConditionalOnBean(annotation = EnableRedisSession.class)
@EnableScheduling
public class SessionAutoConfiguration extends org.springframework.session.data.redis.config.annotation.web.http.RedisHttpSessionConfiguration {

    private final static Logger logger = LoggerFactory.getLogger(SessionAutoConfiguration.class);


    private Integer maxInactiveIntervalInSeconds = Integer.valueOf(1800);
    private ConfigureRedisAction configureRedisAction = new ConfigureNotifyKeyspaceEventsAction();
    private String redisNamespace = "";

    @Bean
    @ConfigurationProperties(prefix = "server", ignoreUnknownFields = true)
    public ServerProperties serverProperties() {
        ServerProperties serverProperties = new ServerProperties();
        ServerProperties.Session.Cookie cookie = serverProperties.getSession().getCookie();
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        return serverProperties;
    }

    @Bean
    public HttpSessionStrategy httpSessionStrategy() {
        CookieHttpSessionStrategy cookieHttpSessionStrategy = new CookieHttpSessionStrategy();
        DefaultCookieSerializer cookieSerializer = new DefaultCookieSerializer();
        cookieHttpSessionStrategy.setCookieSerializer(cookieSerializer);
        cookieSerializer.setCookieName("SID");
        //cookieSerializer.setCookiePath("/");
        cookieSerializer.setUseHttpOnlyCookie(true);
        return cookieHttpSessionStrategy;
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.redis.session")
    public RedisConnectionFactory sessionRedisConnectionFactory() {
        String[] propertys = new String[]{"host-name", "database", "port"};
        for (String property : propertys) {
            if (ConfigHelper.isEmpty("spring.redis.session." + property)) {
                throw LogicException.generateException("未配置 " + "spring.redis.session." + property + "!");
            }
        }
        return new JedisConnectionFactory();
    }

    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(@Qualifier("sessionRedisConnectionFactory") RedisConnectionFactory connectionFactory, RedisOperationsSessionRepository messageListener) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(messageListener, Arrays.asList(new PatternTopic[]{new PatternTopic("__keyevent@*:del"), new PatternTopic("__keyevent@*:expired")}));
        container.addMessageListener(messageListener, Arrays.asList(new PatternTopic[]{new PatternTopic(messageListener.getSessionCreatedChannelPrefix() + "*")}));
        return container;
    }

    @Bean
    public RedisTemplate<Object, Object> sessionRedisTemplate(@Qualifier("sessionRedisConnectionFactory") RedisConnectionFactory connectionFactory) {
        RedisTemplate template = new RedisTemplate();
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setDefaultSerializer(new GenericJackson2JsonRedisSerializer());
        template.setConnectionFactory(connectionFactory);
        return template;
    }

    public void setRedisNamespace(String namespace) {
        this.redisNamespace = namespace;
    }

    private String getRedisNamespace() {
        return StringUtils.hasText(this.redisNamespace) ? this.redisNamespace : System.getProperty("spring.session.redis.namespace", "");
    }

    public void setImportMetadata(AnnotationMetadata importMetadata) {
        this.maxInactiveIntervalInSeconds = ConfigHelper.getInt("server.session.timeout", 1800);
    }

    @Bean
    public InitializingBean enableRedisKeyspaceNotificationsInitializer(@Qualifier("sessionRedisConnectionFactory") RedisConnectionFactory connectionFactory) {
        return new EnableRedisKeyspaceNotificationsInitializer(connectionFactory, this.configureRedisAction);
    }

    @Autowired(required = false)
    public void setConfigureRedisAction(ConfigureRedisAction configureRedisAction) {
        this.configureRedisAction = configureRedisAction;
    }

    @Bean
    public RedisOperationsSessionRepository sessionRepository(@Qualifier("sessionRedisTemplate") RedisOperations<Object, Object> sessionRedisTemplate, ApplicationEventPublisher applicationEventPublisher) {
        RedisOperationsSessionRepository sessionRepository = new RedisOperationsSessionRepository(sessionRedisTemplate);
        sessionRepository.setApplicationEventPublisher(applicationEventPublisher);
        sessionRepository.setDefaultMaxInactiveInterval(this.maxInactiveIntervalInSeconds.intValue());
        sessionRepository.setDefaultSerializer(new GenericJackson2JsonRedisSerializer());
        String redisNamespace = this.getRedisNamespace();
        if (StringUtils.hasText(redisNamespace)) {
            sessionRepository.setRedisKeyNamespace(redisNamespace);
        }
        return sessionRepository;
    }

    public void setMaxInactiveIntervalInSeconds(int maxInactiveIntervalInSeconds) {
        this.maxInactiveIntervalInSeconds = Integer.valueOf(maxInactiveIntervalInSeconds);
    }


    static class EnableRedisKeyspaceNotificationsInitializer implements InitializingBean {
        private final RedisConnectionFactory connectionFactory;
        private ConfigureRedisAction configure;

        EnableRedisKeyspaceNotificationsInitializer(RedisConnectionFactory connectionFactory, ConfigureRedisAction configure) {
            this.connectionFactory = connectionFactory;
            this.configure = configure;
        }

        public void afterPropertiesSet() throws Exception {
            RedisConnection connection = this.connectionFactory.getConnection();
            this.configure.configure(connection);
        }
    }
}
