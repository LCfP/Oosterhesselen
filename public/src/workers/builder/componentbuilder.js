import Worker from '../worker';


class ComponentBuilder extends Worker
{
    constructor(structure)
    {
        super();

        // Defines rendering structure for the page.
        this.structure = structure;
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