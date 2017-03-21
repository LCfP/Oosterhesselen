import "./vendor/js/bootstrap";
import "./vendor/css/bootstrap.css";
import './assets/helpers';

import structure from './assets/structure';
import ComponentBuilder from './workers/builder/componentbuilder';


const builder = new ComponentBuilder(structure);
builder.build();
