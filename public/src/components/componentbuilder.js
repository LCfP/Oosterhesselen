import Topbar from './nav/topbar';
import Body from './body/body';
import Table from './table/table';
import About from './body/side/about';


class ComponentBuilder
{
    constructor()
    {
        // Defines rendering structure of the page (a table of contents, of sorts).
        this.structure = {
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
                                anchor: "#container"
                            }
                        }
                    },
                    table: {
                        here: {
                            class: Table,
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
    }

    build()
    {
        this._buildBranch(this.structure);
    }

    _buildBranch(branch)
    {
        if (branch.hasOwnProperty("here")) {
            new branch.here.class(branch.here.props);
        } else {
            // loop over items in branch
            Object.keys(branch).forEach(key => {
                this._buildBranch(branch[key]);
            });
        }

        if (branch.hasOwnProperty("lower")) {
            this._buildBranch(branch.lower)
        }
    }
}

export default ComponentBuilder;