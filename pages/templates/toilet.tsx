import Image from "next/image";

const Page = () => {
    return (
        <>
            <div className="pb-20">
                <div className="flex flex-col gap-x-6 sm:px-6 sm-py-24 mx-auto max-w-7xl mt-10">
                    <div className="flex">
                        <div className="flex flex-col flex-1 align-items-center">
                            <div className="flex items-end justify-center mb-4 flex-1">욕실 전문 업체 바로바로 홈케어</div>
                            <hr style={{borderTop: '1px solid #ddd'}} className="border-0 mx-4"></hr>
                            <div className="flex flex-col justify-center text-center mt-8">
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <strong className="text-sm text-slate-800 text-center">"20년 경험의 욕실 전문업체 바로바로
                                    홈케어"</strong>
                                <p className="text-sm text-slate-800">서울, 경기 전 지역 24시간 무료상담 가능합니다.</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <Image style={{height: 500}} src="../../assets/images/toilet/1.jpg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="hover:opacity-40 h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>
                        <div className="flex-1">
                            <Image src="../../assets/images/toilet/2.jpeg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>
                    </div>

                    <div className="flex flex-1 mt-4 gap-x-1">
                        <div className="flex-1">
                            <Image style={{height: 202}} src="../../assets/images/toilet/3.jpg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>

                        <div className="flex-1">
                            <Image style={{height: 202}} src="../../assets/images/toilet/4.jpg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>

                        <div className="flex-1">
                            <Image style={{height: 202}} src="../../assets/images/toilet/5.jpg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>

                        <div className="flex-1">
                            <Image style={{height: 202}} src="../../assets/images/toilet/6.jpg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>

                        <div className="flex-1">
                            <Image style={{height: 202}} src="../../assets/images/toilet/7.jpg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>

                        <div className="flex-1">
                            <Image style={{height: 202}} src="../../assets/images/toilet/8.jpg"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </div>

                    </div>

                    <div className="flex mt-40">
                        <div className="flex flex-col flex-1 justify-center me-10">
                            <div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/3.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                        </div>
                        <div className="flex flex-1 justify-center">
                            <div>
                                <h1 className="text-2xl font-extralight">바로바로 홈케어란?</h1>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-3"></hr>
                                <p className="font-extralight text-sm">
                                    바로바로 홈케어란 변기,세면대,싱크대등 주방과 욕실에 관한 전반적인 문제를 해결 하여 드립니다.
                                    변기막힘, 변기교체, 싱크대교체, 수도꼭지교체, 하수구막힘 등등 모든 문제에 관하여 24시간 상담 가능하고
                                    서울, 경기 전 지역 출장 가능합니다.
                                    <br/>
                                    <br/>
                                    바로바로 홈케어는 20년 넘는 노하우와 기술로 문젱에 관한 원인을 정확히 분석하여
                                    고객님께 설명 드리고 최적의 방법으로 저렴한 솔루션을 제공하여 드립니다.
                                    <br/>
                                    <br/>
                                    20년동안 1000건이 넘는 다양한 작업으로 여러 문제를 해결 해왔으며
                                    수 많은 직원들이 다양한 경험으로 빠르고 적합한 솔루션을 제공 해드립니다.
                                    <br/>
                                    <br/>
                                    변기,세면대,싱크대 쉽게 해결 할 수 있을것 같지만 전문가의 도움이 필요 합니다.
                                    해결이 어려울 때 고민 없이 바로바로 홈케어에 상담 해주세요
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-40">
                        <div className="flex justify-center">
                            <span className="text-2xl text-gray-800">1</span>
                        </div>
                        <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-3"></hr>
                        <div className="flex justify-center">
                            <h1 className="text-lg">서울 지역</h1>
                        </div>

                        <div className="flex mt-20 gap-x-3">
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">서울 강서</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">서울 강서 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/3.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">서울 강동</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">서울 강서 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/4.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">서울 중구</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">서울 강서 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/5.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">서울 명동</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">서울 강서 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/6.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-20">
                        <div className="flex justify-center">
                            <span className="text-2xl text-gray-800">2</span>
                        </div>
                        <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-3"></hr>
                        <div className="flex justify-center">
                            <h1 className="text-lg">경기 지역</h1>
                        </div>

                        <div className="flex mt-20 gap-x-3">
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">경기 파주</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">경기 북로 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/3.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">경기 일산</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">경기 강서 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/4.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">경기 김포</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">경기 강서 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/5.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex-1 font-mono">경기 의정부</div>
                                <hr style={{borderTop: '1px solid #ddd'}} className="border-0 my-4 me-12"></hr>
                                <div className="text-sm font-sans mb-5">경기 강서 37번길 1</div>
                                <Image style={{height: 300}} src="../../assets/images/toilet/6.jpg"
                                       alt="Front of men&#039;s Basic Tee in black."
                                       className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white px-6 py-24 sm:py-28 lg:px-8">
                        <div
                            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                            aria-hidden="true">
                            <div
                                className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                                style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
                        </div>
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">인터넷 상담</h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">고객님의 휴대폰 번호와 상담 내용을 남겨 주시면 견적과 솔루션을 도출한
                                뒤 전화 드립니다.</p>
                        </div>
                        <form action="#" method="POST" className="mx-auto mt-12 max-w-xl sm:mt-12">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label
                                        className="block text-sm font-semibold leading-6 text-gray-900">성함</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="name" id="name"
                                               className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        className="block text-sm font-semibold leading-6 text-gray-900">휴대폰
                                        번호</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="phone_number" id="phone_number"
                                               className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        className="block text-sm font-semibold leading-6 text-gray-900">상담 내용</label>
                                    <div className="mt-2.5">
                            <textarea name="message" id="message" rows={4}
                                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button type="submit"
                                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    상담하기
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex flex-col justify-center mb-4">
                        <div className="flex justify-center mb-4">
                            <svg style={{width: 25, height: 25}} xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                 className="w-6 h-6 fill-gray-900 stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"/>
                            </svg>
                            <span className="ml-2">
                    010-4909-6763
                (서울지점)
                </span>
                        </div>
                        <div className="flex justify-center mb-4">
                            <svg style={{width: 25, height: 25}} xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                                 className="w-6 h-6 fill-gray-900 stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"/>
                            </svg>
                            <span className="ml-2">
                    010-2375-6763
                (경기지점)
                </span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <span className="text-sm font-extralight">AM 06:00 - PM 23:00</span>
                            </div>
                            <p className="text-center text-sm font-extralight">
                                대표이사: 신지연 <br/>
                                오피스: 파주 심학산로 384 <br/>
                                전화번호: 010-4909-6763 | 이메일: hobath01022naver.com
                            </p>
                        </div>


                    </div>

                    <div className="flex justify-center gap-x-3">
                        <a target="_blank" href="https://open.kakao.com/o/sE931YOf">
                            <Image style={{width: 65, height: 65}} src="../../assets/images/toilet/kakao.png"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </a>
                        <a target="_blank" href="https://blog.naver.com/these9907">
                            <Image style={{width: 65, height: 65}} src="../../assets/images/toilet/naver3.png"
                                   alt="Front of men&#039;s Basic Tee in black."
                                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                        </a>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Page;