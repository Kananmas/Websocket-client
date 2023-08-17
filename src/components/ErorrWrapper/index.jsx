import { Alert, Space } from "antd";
import { ErrorField } from "./index.style";
import { If } from "../If";

export function ErrorWrapper({ error }) {
  return (
    <If condition={error}>
      <ErrorField style={{ marginTop: "30px" }}>
        <Space>
          <Alert
            style={{ textAlign: "start" }}
            description={error}
            message="Erorr Text"
            type="error"
            closable
          />
        </Space>
      </ErrorField>
    </If>
  );
}
