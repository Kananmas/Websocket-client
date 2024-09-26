// components
import { Button } from "antd";
import { BtnHolder, Page, PageInput } from "./index.style";
import { GetUserRequest } from "../../Classes/Requests/UserRequests/GET";
import { ErrorWrapper } from "../../components/ErorrWrapper";


// hooks
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/localstorage.hook";
import { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";


export function SignIn() {
  const { authState, authActions, authMutator } = useAuth();
  const [error, setError] = useState();
  const {setter:set} = useLocalStorage();
  const router = useNavigate();

  const handleOnChangeEmail = (e) => {
    const action = authActions.mutateEmail(e.target.value);

    authMutator(action);
  };

  const handleOnChangePassword = (e) => {
    const action = authActions.mutatePassword(e.target.value);

    authMutator(action);
  };

  const handleClickSubmit = async () => {
    try {
      const { email, password } = authState;

      let request = new GetUserRequest(email, password);

      var response = await request.Send();
      var json = await response.json();
      var result = await json;

      set("access_Token", {
        accessToken: result["jwtToken"],
      });

      router("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Page>
      <label>Email :</label>
      <PageInput onChange={handleOnChangeEmail} type="email" />
      <label>Password :</label>
      <PageInput onChange={handleOnChangePassword} type="password" />
      <BtnHolder>
        <Button onClick={handleClickSubmit}>Submit</Button>
      </BtnHolder>

      <ErrorWrapper error={error} />
    </Page>
  );
}
