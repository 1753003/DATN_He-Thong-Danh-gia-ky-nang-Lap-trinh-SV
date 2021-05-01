import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Badge, Button} from 'antd'
import { LikeTwoTone, DislikeTwoTone,  } from '@ant-design/icons';

const ReactComment = ({ data, id, reactArray, handleClick}) =>{ 
  const [init, setInit] = useState(false)
  const [local, setLocal] = useState({
    react: typeof(reactArray)!=="undefined"?reactArray[id]:0,
    vote: data
  })

  useEffect(()=>{
    setInit(true)
  },[]);
  useEffect(()=>{
    const timer = setTimeout(() => {
      if(init){
        handleClick(id, local.react, local.vote)
      }
    }, 10);
    return () => clearTimeout(timer);
    
  },[local]);
  const handleUpvoted = () =>{
    try {
      if(local.react === 1)
      {
        setLocal({
          react:0,
          vote:local.vote-1
        })
      }
    else if(local.react === -1)
      {
        setLocal({
          react:1,
          vote:local.vote+2
        })
      }
      else
      {
        // setReact(1)
        // setVote(vote=>vote+1)
        setLocal({
          react:1,
          vote:local.vote+1
        })
      }
    } catch (error) {
      
    } finally {
      // handleClick(id, local.react, local.vote)
    }
    
    
      
    }
    const handleDownvoted = () =>{
      try {
        if(local.react === -1)
        {
          setLocal({
            react:0,
            vote:local.vote+1
          })
        }
      else if(local.react === 1)
        {
          setLocal({
            react:-1,
            vote:local.vote-2
          })
        }
        else
        {
          // setReact(1)
          // setVote(vote=>vote+1)
          setLocal({
            react:-1,
            vote:local.vote-1
          })
        }
      } catch (error) {
        
      } finally {
        
      }

  }
  // console.log(local.vote)
  return (<>
  <Button size='large' type="text" icon={<LikeTwoTone twoToneColor={local.react===1?"#0077c3":"#c1c1c1"} />} onClick={()=>handleUpvoted()}></Button>
  
  <Badge count={local.vote} showZero style={{backgroundColor:"#fff", color:"grey"}}>
    </Badge>
  <Button size='large' type="text" icon={<DislikeTwoTone twoToneColor={local.react===-1?"#d90068":"#c1c1c1"} />} onClick={()=>handleDownvoted()}></Button>
  </>)
}

export default connect(({ user }) => ({
  reactArray: user.currentUser.react
}))(ReactComment);