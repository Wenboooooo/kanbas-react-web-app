import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";
import BooleanVariables from "./variables/BooleanVariables";
import IfElse from "./variables/IfElse";
import WorkWithFunctions from "./functions/WorkWithFunctions";
import JsonStringify from "./json/JsonStringify";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import TemplateLiterals from "./string/TemplateLiterals";
import House from "./json/House"
import Spreading from "./json/Spreading";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./json/FunctionDestructing";
import PathParameters from "../routing/PathParameters";

function JavaScript() {
    console.log('Hello World!');
    return(
        <div>
            <h1>JavaScript</h1>
            <VariablesAndConstants/>
            <VariableTypes/>
            <BooleanVariables/>
            <IfElse/>
            <WorkWithFunctions/>
            <WorkingWithArrays/>
            <JsonStringify/>
            <TemplateLiterals/>
            <House/>
            <Spreading/>
            <Destructing/>
            <FunctionDestructing/>
            <PathParameters/>
        </div>
    );
}
export default JavaScript

