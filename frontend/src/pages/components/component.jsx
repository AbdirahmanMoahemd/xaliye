import * as React from "react";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  

  render() {
    const { text } = this.props;

    return (
      <div className="relativeCSS">
        <div className="flash" />
        <table className="testClass">
          <thead>
            <tr>
              <th className="column1">Test Name</th>
              <th>Test</th>
            </tr>
          </thead>
          <tbody>
            <td>{text ?? 'text'} </td>
          
          </tbody>
        </table>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <ComponentToPrint ref={ref} text={props.text} />;
});
 