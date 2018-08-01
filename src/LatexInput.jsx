import React from 'react';
import 'mathquill/build/mathquill.css';
import 'mathquill/build/mathquill.js';
import './LatexInput.css';
import Button from '@material-ui/core/Button';
import { addField } from 'ra-core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
class Latex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latexValue: props.initValue || '',
            latexFocus: false,
            toolBox: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            var mathFieldSpan = document.getElementById('math-field');
            var MQ = window.MathQuill.getInterface(2);
            this.mathField = MQ.MathField(mathFieldSpan, {
                spaceBehavesLikeTab: true,
                handlers: {
                    edit: (mathField) => {
                        const latexValue = mathField.latex();
                        this.setState({
                            latexValue
                        }, () => {
                            this.refs.in.focus();
                        })
                        if (this.props.onChange) {
                            this.props.onChange(latexValue);
                        }
                        mathField.focus()
                    }
                }
            });
            this.mathFieldFocusListenner = this.setLatexFocus.bind(this);
            window.addEventListener('click', this.mathFieldFocusListenner);
            if (this.props.initValue) {
                this.mathField.write(this.props.initValue);
            }
        });
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.mathFieldFocusListenner);
    }
    setLatexFocus() {
        if (this.mathField) {
            const latexFocus = !this.mathField.__controller.blurred;
            if (this.state.latexFocus !== latexFocus) {
                this.setState({ latexFocus });
            }
            document.cr
        }
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
            <div style={{ position: 'relative' }} className="latex-input">
                <span style={{ opacity: 0, position: 'absolute', zIndex: -9999 }}>
                    <input type="text" {...input} value={this.state.latexValue} ref="in" />
                </span>
                <FormControl className={'classes.margin'}>
                    <InputLabel
                        FormLabelClasses={{
                            root: 'classes.cssLabel',
                            focused: 'classes.cssFocused',
                        }}
                        focused={this.state.latexFocus}
                        shrink={!!this.state.latexValue || this.state.latexFocus}
                        htmlFor="custom-css-input"
                    >
                        {label}
                    </InputLabel>
                    <div id="math-field" />
                    <Button onClick={() => this.setState({ toolBox: !this.state.toolBox })}>{this.state.toolBox ? 'Hide toolbox' : 'Show toolBox'}</Button>
                </FormControl>
                <div style={{display: this.state.toolBox ? 'block' : 'none'}}>
                    <Button onClick={() => this.input("\\sqrt")}>√</Button>
                    <Button onClick={() => this.input("\\sin")}>sin</Button>
                    <Button onClick={() => this.input("\\cos")}>cos</Button>
                    <Button onClick={() => this.input("\\tan")}>tan</Button>
                </div>
            </div>
        );
    }
}

export default addField(Latex);
