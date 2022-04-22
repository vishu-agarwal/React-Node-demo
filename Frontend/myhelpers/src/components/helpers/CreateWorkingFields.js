//header file
import * as React from 'react';

//   mui

import AddField from './AddField';


const CreateWorkingFields = (props) => {
    const workDetail = props.workDetails
    console.log(workDetail)
    const list = workDetail.map((val, idx) =>
    {
        let category = `category-${idx}`,
            exprience = `exprience-${idx}`,
            salary = `salary-${idx}`;
        return (
            <AddField
                val={val}
                idx={idx}
                category={category}
                exprience={exprience}
                salary={salary}
                key={val}
                add={props.addRow}
            />
        )

    })
    return (
        <>
            {list}
        </>

    )
}

export default CreateWorkingFields