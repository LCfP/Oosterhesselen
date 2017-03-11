import Component from '../../component';
import Template from '../../../../templates/body/side/about.hbs';

import "../../../styles/about.css";


class About extends Component
{
    /**
     * @override
     */
    constructor(props={}, state={})
    {
        props.template = Template;

        super(props, state);
    }

    /**
     * @override
     */
    mount()
    {
        $("li[data-open='about-side-menu']").click((e) => {
            console.log("Clicked!");
        });
    }
}

export default About;
