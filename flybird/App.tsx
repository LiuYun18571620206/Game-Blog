import React,{useRef} from 'react'
import ReactDom from 'react-dom'
import { HashRouter,Switch,Route } from "react-router-dom";
import FlyBrid from './component/Flybrid/index'
import './index.scss'
function App(){
    let background=useRef(null)
    let comeback=function(but,bg){
        if(but.style.left==='709px'){
            setTimeout(()=>{location.href='http://101.37.76.33'},500) 
            return
        }
        let tran=function(e){
            e.target.style.transition='none'
            e.target.removeEventListener('webkitTransitionEnd',tran)
        }
        but.style.transition='left 1s'
        bg.style.transition='width 1s'
        but.style.left='0px'
        bg.style.width=but.style.width
        but.addEventListener('webkitTransitionEnd',tran)
        bg.addEventListener('webkitTransitionEnd',tran)
    }
    let Drag={state:false,index:null,left:null}
    let handleMouseDownDrag=function(e:any){
        Drag={state:true,index:e.clientX,left:parseInt(e.target.style.left)}
    }
    let handleMouseUpDrag=function(e:any){
        if(Drag.state){
        Drag={state:false,index:null,left:null}
        comeback(e.target,background.current)
        }
    }
    let handleMouseMoveDrag=function(e:any){
        if(Drag.state){
            let value=e.clientX-Drag.index
            value=Drag.left+value
            console.log(value)
            if(value<0){value=0}else if(value>709){value=709}
            background.current.style.width=60+value+'px'
            e.target.style.left=value+'px'
        }
    }
    let handleMouseOut=function(e:any){
        if(Drag.state){
            Drag.state=false
            comeback(e.target,background.current)
        }
    }
    return (
        <>
        <div id='nav'>
                    返回首页
                    <div className='bk' style={{width:'60px'}} ref={background}><p>返回首页</p></div>
                    <div className='but' style={{left:'0px',width:'60px'}} onMouseDown={handleMouseDownDrag} onMouseUp={handleMouseUpDrag}
                    onMouseMove={handleMouseMoveDrag} onMouseOut={handleMouseOut}/>
            </div>
        <div id='game'>
            <FlyBrid />
            </div>
        <div id='background'>
            <div className='box one'/>
            <div className='box two'/>
            <div className='box three'/>
            </div>
        </>
    )
}
ReactDom.render(
<App/>
,document.querySelector('#root'))