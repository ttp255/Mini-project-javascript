
const promt=require("prompt-sync")();
const rows=3
const cols=3

const symbol_count={
   A:2,
   B:4,
   C:6,
   D:8


}
const symbol_values={
    A:6,
    B:5,
    C:4,
    D:3
 
}



const deposit= () =>{
        const depositAmount=promt("Enter the deposite: ")
        let numberDeposite=parseFloat(depositAmount)

        if (isNaN(numberDeposite)||numberDeposite<=0){
            console.log("Try again!")
            return deposit()

        }else{
            return numberDeposite
        }
            
    
    

}
const getNumberOfLines=() =>{
    const lines=promt("Enter the lines: ")
    let numberOfLines=parseFloat(lines)

    if (isNaN(numberOfLines)||numberOfLines<1||numberOfLines>3){
        console.log("Try again!")
        return getNumberOfLines()

    }else{
        return numberOfLines
    }
}
const getBet=(balance,numberOfLines)=>{
    const bet=promt("Enter the bet: ")
    let numberBet=parseFloat(bet)

    if (isNaN(numberBet)||numberBet<=0||numberBet>balance/numberOfLines){
        console.log("Try again!")
        return getBet(balance,numberOfLines)

    }else{
        return numberBet
    }
}

const spin=()=>{
    const symbols=[]
    for(let x in symbol_count){
        for(let i=0;i<symbol_count[x];i++){
            symbols.push(x)
        }
    }
    const reels=[]

    for (let i=0;i<rows;i++){
        const reelsymbols=[...symbols]
        reels.push([])
        for(let j=0;j<cols;j++){
            const radomIndex=Math.floor(Math.random()*reelsymbols.length)
            selectedSymbols=reelsymbols[radomIndex]
            reels[i].push(selectedSymbols)
            reelsymbols.splice(radomIndex,1)
        }
    }
    return reels
 
}
const tranpose=(reels)=>{
    const r=[]
    
    for(let i=0;i<rows;i++){
        r.push([])
        for(let j=0;j<cols;j++){
            r[i].push(reels[j][i])
        }
        
    }
    return r
}
const printRow=(r)=>{
    for(let i=0;i<r.length;i++){
        let symbol=""
        for(let j=0;j<r[i].length;j++){
           symbol+=r[i][j]
            if(j<r[i].length-1){
                symbol+=' | '

            }
        }
        console.log(symbol)
    }

}
const getWinning=(bet,lines,r)=>{
    let winner=0
    
    for(let i=0;i<lines;i++){
        let check=true
        for(x of r[i]){
            if(x!=r[i][0]){
                check=0
                break
            }
        }
        if(check){
            winner+=bet*symbol_values[r[i][0]]

        }
    }
    return winner
}
while(true){
    let balance=deposit()
    let numberOfLines=getNumberOfLines()

    let bet=getBet(balance,numberOfLines)

    const reels=spin()
    const r=tranpose(reels)
    printRow(r)
    let winner=getWinning(bet,numberOfLines,r)
    console.log('You won: $'+winner)
    const res=promt("Do you want to play again?(Y/N): ")
    if(res.toLowerCase()=='n'){
        break
    }
}

 

