import React from 'react';
import 'mathquill/build/mathquill.css';
import 'mathquill/build/mathquill.js';
import TextField from '@material-ui/core/TextField';
import { addField, FieldTitle } from 'ra-core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
class Latex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latexValue: props.initValue || ''
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
                        console.log('aa')
                        const latexValue = this.mathField.latex();
                        this.setState({
                            latexValue
                        }, () => {
                            this.refs.in.focus();
                        })
                        if (this.props.onChange) {
                            this.props.onChange(latexValue);
                        }
                        this.mathField.focus()
                    },
                    enter: (mathField) => { console.log('aaa') }
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
                <FormControl className={'classes.margin'}>
                    <InputLabel
                        FormLabelClasses={{
                            root: 'classes.cssLabel',
                            focused: 'classes.cssFocused',
                        }}
                        focused
                        shrink
                        htmlFor="custom-css-input"
                    >
                        {label}
                    </InputLabel>
                    <div id="math-field" style={{ marginTop: 30 }} />
                </FormControl>

                {/* <TextField
                    {...input}
                    margin="normal"
                    inputProps={{ style: { opacity: 0, height: this.state.latexHeight } }}
                    onFocus={() => { }}
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
                    style={{ height: this.state.latexHeight }}
                /> */}
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
