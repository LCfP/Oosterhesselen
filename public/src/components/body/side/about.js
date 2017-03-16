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
        const $handler = $("#about");
        const $wrapper = $("#table");

        $("li[data-open='about-side-menu']").click(e => {
            $handler.width(480);
            $wrapper.css({opacity: .3});
        });

        $wrapper.click(function () {
            $handler.width(0);
            $wrapper.css({opacity: 1});
        });
    }
}

export default About;
