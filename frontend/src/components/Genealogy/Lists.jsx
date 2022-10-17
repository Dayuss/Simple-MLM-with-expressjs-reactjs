import React from 'react'

const Lists = ({
    key,
    fullname,
    children,
    bonus,
    hasChild
}) => {
  
  return (
        <li key={key}>
            <a href='javascript:void(0);'>
                <div class='member-view-box'>
                    <div class='member-image'>
                        <img src={`https://picsum.photos/200/300?random=${Math.floor((Math.random()*100) + 1)}`} alt='Member'/>
                        <div class='member-details'>
                            <h3>{fullname}</h3>
                            <h6>(Bonus: ${bonus})</h6>
                        </div>
                    </div>
                </div>
            </a>
            {
                hasChild&&children!==undefined?(
                    <ul className="active">
                    {
                        children.map((item,key)=>(
                            <Lists
                            key={key}
                            fullname={item.member.fullname}
                            bonus={parseFloat(item.member.totalIn || '0')-parseFloat(item.member.totalOut || '0')}
                            children={item.children}
                            hasChild={item.children!==undefined && item.children.length>0?true:false} />
                        ))
                    }
                    </ul>

                ):""
            }
                    
        </li>
  )
}

export default Lists;