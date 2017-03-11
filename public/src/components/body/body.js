import Component from '../component';
import Template from '../../../templates/body/container.hbs';


class Body extends Component
{
    /**
     * @override
     */
    constructor(props={}, state={})
    {
        props.template = Template;

        super(props, state);
    }
}

export default Body;
