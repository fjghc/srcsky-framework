package com.srcskyframework.starter.freemarker;

import freemarker.core.CollectionAndSequence;
import freemarker.ext.beans.BeansWrapper;
import freemarker.ext.beans.MapModel;
import freemarker.ext.util.ModelFactory;
import freemarker.template.*;

import java.util.Map;
import java.util.Set;

/**
 * Created by IntelliJ IDEA.
 * User: zhanggaojiang
 * Date: 2008-9-22
 * Time: 3:10:37
 * To change this template use File | Settings | File Templates.
 */
public class BeanWrapper extends BeansWrapper {
    private static final boolean altMapWrapper = true;

    public TemplateModel wrap(Object object) throws TemplateModelException {
        if (object instanceof TemplateBooleanModel) {
            return super.wrap(object);
        }

        // attempt to get the best of both the SimpleMapModel and the MapModel of FM.

        if (altMapWrapper && object instanceof Map) {
            return FriendlyMapModel.FACTORY.create(object, this);
            //return getInstance(object, FriendlyMapModel.FACTORY);
        }
        return super.wrap(object);
    }

    /**
     * Attempting to get the best of both worlds of FM's MapModel and SimpleMapModel, by reimplementing the isEmpty(),
     * keySet() and values() methods. ?keys and ?values built-ins are thus available, just as well as plain Map
     * methods.
     */
    private final static class FriendlyMapModel extends MapModel implements TemplateHashModelEx {
        static final ModelFactory FACTORY = new ModelFactory() {
            public TemplateModel create(Object object, ObjectWrapper wrapper) {
                return new FriendlyMapModel((Map) object, (BeansWrapper) wrapper);
            }
        };
        public FriendlyMapModel(Map map, BeansWrapper wrapper) {
            super(map, wrapper);
        }

        public boolean isEmpty() {
            return ((Map) object).isEmpty();
        }

        protected Set keySet() {
            return ((Map) object).keySet();
        }

        public TemplateCollectionModel values() {
            return new CollectionAndSequence(new SimpleSequence(((Map) object).values(), wrapper));
        }
    }
}
