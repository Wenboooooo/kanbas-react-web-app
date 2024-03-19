import ModuleList from "../Modules/List";
import HomeStatus from "./HomeStatus";

function Home() {
    return (

        <div className="my-2 mx-2" style={{display: "flex"}}>
            <div style={{flex: 1}}>
                <ModuleList/>
            </div>
            <HomeStatus/>
        </div>
    );

}

export default Home;