import Component from '../component';
import Template from '../../../templates/body/footer.hbs';

import "../../styles/footer.css";


class Footer extends Component
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

export default Footer;
