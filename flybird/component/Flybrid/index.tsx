import React from 'react'
import bird1 from './img/bird1.png'
import bird2 from './img/bird2.png'
import tiao from './img/tiao.png'
import Zhu from './zhu'
import propTypes from 'prop-types'
interface States{
    columnArry:any,
    states:number,
    number:number
}
interface props{
}
class App extends React.Component<props,States>{
    public birds:any
    public sd:any
    public state:States
    public add:any
    public kinetic:any
    public flash:any
    public fly:any
    constructor(props:any){
        super(props)
        this.state={
            columnArry:[],
            states:0,  //0代表未开始 1代表已经开始 2代表结束
            number:0,
        }
        this.birds=React.createRef()
        this.sd=0
    }
    //回收柱子
    handleRmoveState(index){
        this.state.columnArry[index]=null
        this.setState(this.state)
    }
    //计数器
    handleIncrease(){
        if(this.state.states!==2){
        this.state.number++
        this.setState(this.state)
        }
    }
    //游戏结束
    handleGameOver(){
        this.state.states=2;
        this.setState(this.state)
        clearInterval(this.add)
        clearInterval(this.kinetic)
        clearInterval(this.flash)
        setTimeout(()=>{
            location.reload()
        },3000)
    }
    //屏幕点击
    handleClickStart(){
        let bird=this.birds.current
        if(this.state.states===0){
        document.querySelector('#title').innerHTML=''
        this.add=setInterval(()=>{
            this.state.columnArry.push(this.handleHeight())
            this.setState(this.state)
        },2000)
        this.state.states=1
        bird.style.transition='transform 2.5s'
        bird.style.transform='rotate(90deg)'
        this.fly=setInterval(()=>{
            if(parseInt(bird.style.top)>=450){
                clearInterval(this.fly)
                this.handleGameOver()
            }else if(parseInt(bird.style.top)+this.sd<0){
                bird.style.top='0px'
                this.sd=0
            }else{
                bird.style.top=parseInt(bird.style.top)+(this.sd++<=15?this.sd:15)+'px'
            }
                
        },40)
        this.setState(this.state)
    }else if(this.state.states===1){
        bird.style.transition='transform 0.2s'
        bird.style.transform='rotate(-30deg)'
        setTimeout(()=>{
            bird.style.transition='transform 2.5s'
        bird.style.transform='rotate(90deg)'
        },500)
        this.sd=-10
    }
    }
    //随机获取上下柱子的高度
    handleHeight(j=100){
        let height=485-j-120
        let topHeight=Math.floor(Math.random()*height) 
        let bottomHeight=height-topHeight
        return [topHeight,bottomHeight]
    }
    //开始条左移计时器和翅膀扇动计时器
    componentDidMount(){
    let birds=document.querySelector('#birds')
    let fly=birds.querySelectorAll('img')[1]
    let kinetic:any=document.querySelectorAll('.kinetic')
    this.flash=setInterval(function(){
        if(parseInt(fly.style.top)===0){
            fly.style.top='-33px'
        }else{
            fly.style.top='0px'
        }
    },200)   
    this.kinetic=setInterval(function(){
        let left=parseInt(kinetic[0].style.left);
        if(left<=-400){
            left=0
        }
        kinetic[0].style.left=left-1+'px'
        kinetic[1].style.left=left-1+'px'
    },10)
    }
    render(){
        return(
            <div id='FlyBird' onClick={this.handleClickStart.bind(this)}>
                <div id='title'>
                    <p>Fly Bird</p>
                    <p>点击开始</p>
                </div>
                <div id='birds' ref={this.birds} style={{top:'300px'}}>
                    <img src={bird1}/>
                        <img src={bird2} style={{position:'relative',left:'3.5px'}}/>
                    </div>
                    <div style={{position:'absolute',bottom:'15.1%',width:'800px'}}>
                <img src={tiao} className='kinetic' style={{left:'0px',position:'relative'}}/><img src={tiao} className='kinetic' style={{left:'0px',position:'relative'}}/>
                </div>
                {this.state.columnArry.map((value,index)=>{
                    if(value){
                    return(<Zhu key={index} height={value} remove={this.handleRmoveState.bind(this)}
                     index={index} increase={this.handleIncrease.bind(this)} over={this.handleGameOver.bind(this)
                    }/>)
                    }
                    else{
                        return null
                    }
                })}
                <div className='fraction'>
                <div id='numbers'>
                    {this.state.number}
                </div>
                <div id='start'>
                    {this.state.states===0?'点击开始':this.state.states===1?'':this.state.states===2?'游戏结束':1}
                    </div>
                </div>
                </div>
        )
    }
}
export default App