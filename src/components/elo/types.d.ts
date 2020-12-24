import { InferProps } from 'prop-types';
export declare type InferPropTypes<PropTypes, DefaultProps = {}, Props = InferProps<PropTypes>> = {
    [Key in keyof Props]: Key extends keyof DefaultProps ? Props[Key] | DefaultProps[Key] : Props[Key];
};
