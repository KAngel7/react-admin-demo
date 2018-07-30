import React from 'react';
import 'mathquill/build/mathquill.css';
import 'mathquill/build/mathquill.js';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';

class Latex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latexValue: props.initValue || '',
            latexHeight: 26 + 22
        };
    }
    componentDidMount() {
        setTimeout(() => {
            var mathFieldSpan = document.getElementById('math-field');
            var MQ = window.MathQuill.getInterface(2);
            this.mathField = MQ.MathField(mathFieldSpan, {
                spaceBehavesLikeTab: true,
                handlers: {
                    edit: () => {
                        const latexValue = this.mathField.latex();
                        const latexHeight = 26 + this.mathField.__controller.container.context.scrollHeight;
                        this.setState({
                            latexValue,
                            latexHeight
                        }, () => {
                            this.refs.in.focus();
                        })
                        if (this.props.onChange) {
                            this.props.onChange(latexValue);
                        }
                        this.mathField.focus()
                    }
                }
            });
            if (this.props.initValue) {
                this.mathField.write(this.props.initValue);
            }
        });
    }
    input = (str) => {
        this.mathField.cmd(str);
        this.mathField.focus();
    }
    render() {
        const {
            label,
            source,
            touched,
            error,
            className,
            options,
            picker,
            input,
            resource,
            isRequired,
        } = this.props;
        return (
            <div style={{ position: 'relative' }}>
                <span style={{ opacity: 0, position: 'absolute', zIndex: -9999 }}>
                    <input type="text" {...input} value={this.state.latexValue} ref="in" />
                </span>
                <TextField
                    {...input}
                    margin="normal"
                    inputProps={{style: {opacity: 0, height: this.state.latexHeight}}}
                    onFocus={() => {}}
                    label={
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                    error={!!(touched && error)}
                    helperText={touched && error}
                    className={className}
                    style={{height: this.state.latexHeight}}
                />
                <span id="math-field" style={{ position: 'absolute', left: 0, bottom:10, minWidth: 300 }} />
                {/* <div>
                    <button onClick={() => this.input("\\sqrt")}>√</button>
                    <button onClick={() => this.input("\\sin")}>sin</button>
                    <button onClick={() => this.input("\\cos")}>cos</button>
                    <button onClick={() => this.input("\\tan")}>tan</button>
                </div> */}
            </div>
        );
    }
}

export default addField(Latex);
