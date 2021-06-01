class Debugger
{
    static isDebugOn = true
}

export default function debugLog(value)
{
    if(Debugger.isDebugOn)
    {
        console.log(value)
    }
}

