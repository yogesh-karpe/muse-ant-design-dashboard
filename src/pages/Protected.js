import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react"
function Protected(props){
    const {Component} = props;
    const history = useHistory();
    useEffect(()=>{
        let isLoggedIn = localStorage.getItem("userData")
        if(!isLoggedIn){
            history.push('/sign-in')
        }
    });

    return(
        <div>
            <Component/>
        </div>
    )
}

export default Protected;