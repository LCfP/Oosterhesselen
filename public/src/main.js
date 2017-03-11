import "./vendor/js/bootstrap";
import "./vendor/css/bootstrap.css";

import structure from './assets/structure';
import ComponentBuilder from './workers/builder/componentbuilder';


const builder = new ComponentBuilder(structure);
builder.build();
