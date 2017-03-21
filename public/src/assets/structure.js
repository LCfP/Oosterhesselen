import Topbar from '../../src/components/nav/topbar';
import Body from '../../src/components/body/body';
import Footer from '../../src/components/body/footer';
import Table from '../../src/components/table/table';
import About from '../../src/components/body/side/about';


// Defines rendering structure of the page (a table of contents, of sorts).
const structure = {
    topbar: {
        here: {
            class: Topbar,
            props: {
                anchor: "#document"
            }
        }
    },
    body: {
        here: {
            class: Body,
            props: {
                options: {
                    renderType: "append"
                },
                anchor: "#document"
            }
        },
        lower: {
            about: {
                here: {
                    class: About,
                    props: {
                        options: {
                            renderType: "append"
                        },
                        anchor: "#document",
                        width: 480
                    }
                }
            },
            table: {
                here: {
                    class: Table,
                    props: {
                        anchor: "#table"
                    }
                }
            },
            footer: {
                here: {
                    class: Footer,
                    props: {
                        options: {
                            renderType: "append"
                        },
                        anchor: "#container"
                    }
                }
            }
        }
    }
};

export default structure;
