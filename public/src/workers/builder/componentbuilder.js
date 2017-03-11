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

    _buildBranch(branch) {
        Object.keys(branch).forEach(key => {
            switch (key) {
                case 'here':
                    new branch.here.class(branch.here.props);
                    break;
                case 'lower':
                default:
                    this._buildBranch(branch[key]);
            }
        });
    }
}

export default ComponentBuilder;