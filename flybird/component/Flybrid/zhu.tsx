import React from 'react'
import zhu from './img/zhu.png'
import top from './img/top.png'
export default class Zhu extends React.Component{
    public s:any
    public bird:any
    public time:any
    public state:any
    public props:any
    constructor(props){
        super(props)
        this.s=React.createRef()
        this.state={
            game:false
        }
        //碰撞   用柱子去左移的时候检测上下柱子是否与鸟的位置重合
        this.bird=document.querySelector('#birds')
    }
    //开始检测计时器
    componentDidMount(){
        let green=this.s.current
        this.time=setInterval(()=>{
            //左移
            let left=parseInt(green.style.left)
            green.style.left=left-1+'px'
            //检测碰撞
            if(parseInt(green.style.left)<=75&&parseInt(green.style.left)>=12){
                if(parseInt(this.bird.style.top)<this.props.height[0]+60||parseInt(this.bird.style.top)>485-this.props.height[1]-60-30){
                    this.props.over()
            }
            //检测是否在运行阶段通过柱子
            }else if(parseInt(green.style.left)<=12&&!this.state.start){
                this.props.increase()
                this.state.start=true
                this.setState(this.state)
            }
            //柱子到达最左清除柱子
            if(left===-62){
                clearInterval(this.time)
                this.props.remove(this.props.index)
            }
            }
            ,10
        )
    }
    render(){
        return(
            <div className='green' style={{left:'400px'}} ref={this.s}>
                    <div className='top'>
                        <img src={zhu} className='topHeight' style={{height:this.props.height[0]}}/>
                        <img src={top} className='tops'/>
                        </div>
                        <div className='bottom'>
                            <img src={top} className='bottoms'/>
                            <img src={zhu} className='bottomHeight' style={{height:this.props.height[1]}}/>
                            </div>
                    </div>
        )
    }
}