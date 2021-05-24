import React from 'react'
import PropTypes from 'prop-types'
import './chatRep.scss'
import img from './failedColor.png'
import img2 from './completedColor.png'
import img3 from './inProgresColor.png'

function ChatReport({data, failed, inProgres, completed}) {
    let max = -1
    if (failed > max) max = failed
    if (inProgres > max) max = inProgres
    if (completed > max) max = completed
    const graphSpace = 100
    const fdisplay = (failed/max*graphSpace).toString().concat('%')
    const pdisplay = (inProgres/max*graphSpace).toString().concat('%')
    const cdisplay = (completed/max*graphSpace).toString().concat('%')

    const failedStyle = {
        backgroundColor: "#ff6f8b",
        height: fdisplay,
        borderRadius: '5%',
        width: '100%'
      }

      const inProgrestyle = {
        backgroundColor: "#8675ff",
        height: pdisplay,
        flexGrow: 10,
        order: 4,
        borderRadius: '5%'
      }


      const completedStyle = {
        backgroundColor: "#19ffd6",
        height: cdisplay,
        flexGrow: 10,
        order: 6,
        borderRadius: '5%'
      }
      
    return (
        data ? <div className = 'chatRep'>
            <div className = 'chartHeader'>
        

            <h2 >Chats</h2>
            <div className='separator'/>
            <div style = {{display: 'flex', flexDirection: 'column', flexGrow: 6}}>

            
            <div style = {{width:'5%', height:'auto'}}>
            <div style = {{display:'flex', flexDirection: 'row', whiteSpace:'nowrap'}}>
            <img src = {img} alt=''/>
            <strong>Fallidos</strong>
            </div>
            </div>

            <div style = {{height:'5px', width:'5px'}}/>

            <div style = {{width:'5%', height:'auto'}}>
            <div style = {{display:'flex', flexDirection: 'row', whiteSpace:'nowrap'}}>
            <img src = {img3} alt=''/>
            <strong>En progreso</strong>
            </div>
            </div>

            <div style = {{height:'5px', width:'5px'}}/>

            <div style = {{width:'5%', height:'auto'}}>
            <div style = {{display:'flex', flexDirection: 'row', whiteSpace:'nowrap'}}>
            <img src = {img2} alt=''/>
            <strong>Completados</strong>
            </div>
            </div>

            </div>


            </div>
            
            <div className = 'chartSpace'>
            <div style = {{width: '6.25%', order:1}} />


            <div style = {{height:'100%', width:'25%', display:'flex', textAlign: 'center', flexDirection:'column', order:2}}>
            <div style={{flexGrow:10}} / >
            {failed}
            <div style={failedStyle} />
            </div>

            
            <div style = {{width: '6.25%', order:3}} />

            <div style = {{height:'100%', width:'25%', display:'flex', textAlign: 'center', flexDirection:'column', order:4}}>
            <div style={{flexGrow:10}} / >
            {inProgres}
            <div style={inProgrestyle}/>
            </div>

            <div style = {{width: '6.25%', order:5}} />

            <div style = {{height:'100%', width:'25%', display:'flex', textAlign: 'center', flexDirection:'column', order:6}}>
            <div style={{flexGrow:10}} / >
            {completed}
            <div style={completedStyle}/>
            </div>
            
            <div style = {{width: '6.25%', order:7}} />
            </div>
            </div> : <div className = 'chatRep'>No se encontraron datos sobre chats</div>
    )
}

ChatReport.propTypes =  
{
    data: PropTypes.bool.isRequired,
    failed: PropTypes.number.isRequired,
    inProgres: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired
}


export default ChatReport