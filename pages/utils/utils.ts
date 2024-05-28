export const getTargetElement = (_this : any, attr : string | undefined) => {
    const id = _this.currentTarget.getAttribute(`${attr}`)
    return document.querySelector(`#${id}`) as HTMLElement
}
