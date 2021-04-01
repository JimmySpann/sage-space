class Debugger
{
    static isDebugOn = true
}

export default function consoleLog(value)
{
    if(Debugger.isDebugOn)
    {
        console.log(value)
    }
}

