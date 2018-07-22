import { Button, Checkbox, Form, Input, Select } from "antd";
import React from "react";
import { IError } from "../../IFormError";

const FormItem = Form.Item;
const Option = Select.Option;

interface IFormData {
  email: string;
  username: string;
  password: string;
  password1: string;
  firstname: string;
  lastname: string;
  prefix: string;
  phone: string;
  accessLevel: string;
  agreement: boolean;
}

interface IFormError {
  email: IError[];
  username: IError[];
  password: IError[];
  password1: IError[];
  firstname: IError[];
  lastname: IError[];
  prefix: IError[];
  phone: IError[];
  accessLevel: IError[];
  agreement: IError[];
}

class RegisterForm extends React.Component<any> {
  public state = {
    confirmDirty: false,
    duplicateUsername: false,
    usernameValidate: {
      errMessage: "",
      status: undefined,
      success: false
    }
  };
  public handleSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(
      (err: IFormError, values: IFormData) => {
        if (!values.username) {
          this.setState({
            usernameValidate: {
              status: "error",
              help: "Please type in your username!"
            }
          });
        } else if (!this.state.usernameValidate.success) {
          this.setState({
            usernameValidate: {
              status: "error",
              help: "Username already exists!"
            }
          });
        }
      }
    );
  };

  public handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  public compareToFirstPassword = (
    {},
    value: any,
    callback: (message?: string) => void
  ) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  public validateToNextPassword = ({}, value: any, callback: () => void) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["password1"], { force: true });
    }
    callback();
  };

  public render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select>
        <Option value="86">+61</Option>
        <Option value="87">+64</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem
          label="Username"
          help={this.state.usernameValidate.errMessage}
          validateStatus={this.state.usernameValidate.status}
        >
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please type in the username!"
              }
            ]
          })(<Input type="text" onChange={this.checkDuplicatedUsername} />)}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label="Confirm Password">
          {getFieldDecorator("password1", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>
        <FormItem label="First name">
          {getFieldDecorator("firstname", {
            rules: [
              {
                required: true,
                message: "Please enter your first name!"
              }
            ]
          })(<Input type="text" />)}
        </FormItem>
        <FormItem label="Last name">
          {getFieldDecorator("lastname", {
            rules: [
              {
                required: true,
                message: "Please enter your last name!"
              }
            ]
          })(<Input type="text" />)}
        </FormItem>
        <FormItem label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(<Input addonBefore={prefixSelector} />)}
        </FormItem>
        <FormItem label="Role">
          {getFieldDecorator("accessLevel", {
            rules: [{ required: true, message: "Please choose a role!" }]
          })(
            <Select>
              <Option value="1">Student</Option>
              <Option value="2">Teacher</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }

  private checkDuplicatedUsername = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void | undefined => {
    // const username = event.currentTarget.value;

    // new state so that there is loading spinner in the input
    this.setState({
      usernameValidate: {
        status: "validating",
        errMessage: ""
      }
    });

    // do some fetching here
  };
}

export default Form.create()(RegisterForm)