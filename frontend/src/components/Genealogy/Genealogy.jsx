import React, {useState} from 'react'
import { useGetAllQuery, useRegisterMutation } from '../../redux/api/memberApi'
import Lists from './Lists'
import RegisterForm from './RegisterForm'
import MoveForm from './MoveForm'

export const Genealogy = () => {
  const { data, error, isLoading } = useGetAllQuery()
  
  return (
    <>
    <RegisterForm />
    <MoveForm />
      <div className="p-4">
        <div className="flex justify-center flex-wrap">
          {error ? (
            <div className="flex flex-col items-center px-40">
              <h1 className="text-[50px] text-[#E59443] align-center">
                {error.data}
              </h1>
            </div>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
              <ul>
                <li>
                    <a href='javascript:void(0);'>
                        <div class='member-view-box'>
                            <div class='member-image'>
                                <img src='https://picsum.photos/200/300?random=1' alt='Member'/>
                                <div class='member-details'>
                                    <h3>Admin</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                    <ul class='active'>
                      {
                        data.data.map((item,key)=>(
                          <Lists 
                          key={key}
                          fullname={item.member.fullname}
                          bonus={parseFloat(item.member.totalIn || '0')-parseFloat(item.member.totalOut || '0')}
                          children={item.children}
                          hasChild={item.children!==undefined && item.children.length>0?true:false} />
                        ))
                      }
                    </ul>
                  </li>
                </ul>
            ) : null}
        </div>
        
      </div>
    </>
  )
}