import React, {useEffect, useState} from "react";
import "./index.css";
import modules from "../../Database/modules";
import {FaEllipsisV, FaCheckCircle, FaPlusCircle} from "react-icons/fa";
import {useParams} from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./reducer";
import {KanbasState} from "../../store";
import {findModulesForCourse, createModule} from "./client";
import * as client from "./client";


function ModuleList() {

    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };



    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };


    const handleAddModule = () => {
        createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };


    const {courseId} = useParams();
    useEffect(() => {
        findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);

    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();


    // const [moduleList, setModuleList] = useState<any[]>(modules);
    // const [module, setModule] = useState({
    //     name: "New Module",
    //     description: "New Description",
    //     course: courseId,
    //     _id: -1,
    // });
    //
    // const addModule = (module: any) => {
    //     const newModule = {
    //         ...module,
    //         _id: new Date().getTime().toString()
    //     };
    //     const newModuleList = [newModule, ...moduleList];
    //     setModuleList(newModuleList);
    // };
    //
    // const deleteModule = (moduleId: string) => {
    //     const newModuleList = moduleList.filter(
    //         (module) => module._id !== moduleId);
    //     setModuleList(newModuleList);
    // };
    //
    // const updateModule = () => {
    //     const newModuleList = moduleList.map((m) => {
    //         if (m._id === module._id) {
    //             return module;
    //         } else {
    //             return m;
    //         }
    //     });
    //     setModuleList(newModuleList);
    // };
    //
    //
    //
    // const modulesList = modules.filter((module) => module.course === courseId);
    // const [selectedModule, setSelectedModule] = useState(modulesList[0]);
    return (
        <>
            {/* <!-- Add buttons here --> */}
            {/*<ul className="list-group wd-modules">*/}
            {/*    {modulesList.map((module) => (*/}
            {/*        <li*/}
            {/*            className="list-group-item"*/}
            {/*            onClick={() => setSelectedModule(module)}>*/}
            {/*            <div>*/}
            {/*                <FaEllipsisV className="me-2"/>*/}
            {/*                {module.name}*/}
            {/*                <span className="float-end">*/}
            {/*                    <FaCheckCircle className="text-success"/>*/}
            {/*                    <FaPlusCircle className="ms-2"/>*/}
            {/*                    <FaEllipsisV className="ms-2"/>*/}
            {/*                </span>*/}
            {/*            </div>*/}
            {/*            {selectedModule._id === module._id && (*/}
            {/*                <ul className="list-group">*/}
            {/*                    {module.lessons?.map((lesson) => (*/}
            {/*                        <li className="list-group-item">*/}
            {/*                            <FaEllipsisV className="me-2"/>*/}
            {/*                            {lesson.name}*/}
            {/*                            <span className="float-end">*/}
            {/*                                <FaCheckCircle className="text-success"/>*/}
            {/*                                <FaEllipsisV className="ms-2"/>*/}
            {/*                            </span>*/}
            {/*                        </li>*/}
            {/*                    ))}*/}
            {/*                </ul>*/}
            {/*            )}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}


            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    {/*<button onClick={() => dispatch(addModule({ ...module, course: courseId }))}>*/}
                    {/*    Add*/}
                    {/*</button>*/}
                    <button onClick={handleAddModule}>
                        Add
                    </button>
                    <button onClick={handleUpdateModule}>
                        Update
                    </button>

                    <input value={module.name}
                           onChange={(e) => dispatch(setModule({...module, name: e.target.value}))
                           }/>
                    <textarea value={module.description}
                              onChange={(e) => dispatch(setModule({...module, description: e.target.value}))
                              }/>

                </li>
                {moduleList
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index} className="list-group-item">

                            <button
                                onClick={() => dispatch(setModule(module))}>
                                Edit
                            </button>


                            <button
                                onClick={() => handleDeleteModule(module._id)}>
                                Delete
                            </button>

                            ...
                            {module.name}
                            <p>{module.description}</p>
                            <p>{module._id}</p>
                            ...
                        </li>))}
            </ul>

        </>
    );
}

export default ModuleList;