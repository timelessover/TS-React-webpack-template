import * as React from "react";
import * as ReactDom from "react-dom";
import Button from './button/Button'

class App extends React.Component{
    public render() {
        return (
            <div>
               <Button>123456</Button>
            </div>
        )
      }
}

// 把我们的CounterComponent组件渲染到id为app的标签内
ReactDom.render(<App/>,document.getElementById("app"))  