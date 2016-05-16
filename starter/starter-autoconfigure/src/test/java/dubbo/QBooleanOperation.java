/**
 * 宝龙电商
 * dubbo
 * QBooleanOperation.java
 * <p>
 * 2016-03-30
 * 2016宝龙公司-版权所有
 */
package dubbo;

import com.querydsl.core.types.PredicateOperation;
import com.querydsl.core.types.dsl.BooleanOperation;

/**
 * QBooleanOperation
 *
 * @author Zhanggj
 * @version 1.0.0
 * @time 17:01
 * @email zhanggj@powerlong.com
 * @description 职责描述
 */
public class QBooleanOperation extends BooleanOperation {

    protected QBooleanOperation(PredicateOperation mixin) {
        super(mixin);
    }
}