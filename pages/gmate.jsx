import connect from "../lib/database"
import {
    objectify,
    getTestSequence,
    randomGroupKeys,
    groupByKey

} from "gmate"

function CetakSoal ({ soal, kondisi }) {
    return (
        <div>
            { kondisi.seq }
            <div dangerouslySetInnerHTML={{__html:kondisi.konten }} />
            <div dangerouslySetInnerHTML={{__html:soal.konten }} />
            <div dangerouslySetInnerHTML={{__html:soal.a }} />
            <div dangerouslySetInnerHTML={{__html:soal.b }} />
            <div dangerouslySetInnerHTML={{__html:soal.c }} />
            <div dangerouslySetInnerHTML={{__html:soal.d }} />
            <div dangerouslySetInnerHTML={{__html:soal.e }} />
        </div>
    )
}

export default function Gmate (props) {
    const soal = props.soalByKey.S15

    return (
        <div style={{
            padding: '1rem',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor:    "orange"
        }}>
            <h1>tes Gmate {props.dfSoal.length}</h1>
            {/* <pre>{JSON.stringify(props.leaders)}</pre>
            <p>{soal.konten}</p>
            <p>{soal.a}</p>
            <p>{soal.b}</p>
            <p>{soal.c}</p>
            <p>{soal.d}</p>
            <p>{soal.e}</p> */}

            <CetakSoal soal={soal} kondisi={props.kondisiByKey[soal.ref]} />

        </div>
    )
}

export const getServerSideProps = async () => {
    const db = await connect ()
    const rs = await db.all ("SELECT * FROM soal ")
    console.log (rs);

    const rs2 = await db.get ("SELECT leader from meta")
    console.log (rs2);
    const leaders = rs2.leader.split(" ")
    console.log (leaders);

    const soalByKey = objectify (rs) 
    console.log (soalByKey);

    const sekuen = getTestSequence(rs, leaders)
    console.log(sekuen);

    // const groups = await db.all

    const groupKeys = randomGroupKeys (groupByKey(rs), leaders)
    console.log (groupKeys);

    const rs3 = await db.all("select * from kondisi")
    const kondisiByKey = objectify (rs3)

    return {
        props: {
            dfSoal: rs, 
            leaders,
            soalByKey,
            sekuen,
            kondisiByKey
        }
    }
}