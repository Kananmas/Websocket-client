import { Button } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { BtnHolder, Page, PageInput } from "./index.style";
import { PostUserRequest } from "../../Classes/Requests/UserRequests/POST";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ErrorWrapper } from "../../components/ErorrWrapper";

export function SignUp() {
    const {
        authState,
        authActions,
        authMutator
    } = useAuth();
    const router = useNavigate();
    const [error,setError] = useState(null);
    const {setter} = useLocalStorage();

    useEffect(() => {
        authMutator(authActions.mutateType("user"));
    },[])
    const handleOnChangeUsername = (e) => {
       const action = authActions.mutateUsername(e.target.value);

        authMutator(action);
    }

    const handleOnChangePassword = (e) => {
       const action = authActions.mutatePassword(e.target.value);

        authMutator(action);
    }

    const handleOnChangeEmail = (e) => {
        const action = authActions.mutateEmail(e.target.value);

        authMutator(action);
    }

    const handleOnChangeName = (e) => {
        const action = authActions.mutateName(e.target.value);

        authMutator(action);
    }

    const handleOnChangeFamilyName = (e) => {
        const action = authActions.mutateFamilyName(e.target.value);

        authMutator(action);
    }

    
    const handleOnChangePhoneNumber = (e) => {
        const action = authActions.mutatePhoneNumber(e.target.value);

        authMutator(action);
    }

    const handleOnClickSubmit = async () => {
       try {
        const request = new PostUserRequest(authState);

        var response = await request.Send();
        var json = await response.json();
        var result = await json;
        setter("access_Token", {
         accessToken:result["jwtToken"]
        })

        router("/chat")
       }
       catch(e) {
           const statusCode = e.statusCode;
           console.log(e);
           setError(e.Message);
       }
    }

    return <Page>
        <label>Name :</label>
        <PageInput  onChange={handleOnChangeName}  />
        <label>Family Name :</label>
        <PageInput  onChange={handleOnChangeFamilyName}  />
        <label>Username :</label>
        <PageInput  onChange={handleOnChangeUsername}  />
        <label>Password :</label>
        <PageInput  onChange={handleOnChangePassword} type="password"/>
        <label>Email :</label>
        <PageInput  onChange={handleOnChangeEmail} type="email"/>
        <label>Phone Number :</label>
        <PageInput  onChange={handleOnChangePhoneNumber} type="number"/>
        <BtnHolder>
        <Button onClick={handleOnClickSubmit}>
            Submit
        </Button>
        </BtnHolder>
        <ErrorWrapper error={error} />
    </Page>

}