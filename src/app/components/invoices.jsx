"use client"
import React from 'react'
import StatusFilter from './filter'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import DatePicker from './datepicker';

export default function Invoices() {
    return (
        <>
            <div className='py-[32px] px-[24px]'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-[24px]'>
                            Invoices
                        </h1>
                        <p className='text-[13px]'>
                            No invoices
                        </p>
                    </div>
                    <div className='flex items-center gap-[20px]'>
                        <div>
                            <StatusFilter />
                        </div>
                        <div className='p-[24px]'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="flex items-center gap-2 bg-[#7B5CFF] text-white font-bold pl-2 pr-4 py-2 rounded-full shadow hover:bg-[#6A4DE0] transition">
                                        <span className="bg-white text-[#7B5CFF] rounded-full w-8 h-8 flex justify-center text-lg font-bold">
                                            +
                                        </span>
                                        <p className='text-[17px]'>New</p>
                                    </button>
                                </DialogTrigger>

                                <DialogContent className='overflow-y-auto max-h-[80vh]'>
                                    <form>
                                        <div className=''>
                                            <Label htmlFor="street" className='pb-[9px]'>Street Adress</Label>
                                            <Input id="street" />
                                        </div>
                                        <div>
                                            <div className='flex justify-center items-center gap-10'>
                                                <div className='pt-[25px]'>
                                                    <Label htmlFor="city" className='pb-[9px]' >City</Label>
                                                    <Input id="city"/>
                                                </div>
                                                <div className='pt-[25px]'>
                                                    <Label htmlFor="postcode" className='pb-[9px]'>Post Code</Label>
                                                    <Input id="postcode" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pt-[25px]' >
                                            <Label htmlFor="street" className='pb-[9px]'>Street Adress</Label>
                                            <Input id="street" />
                                        </div>
                                        <h1 className='pt-[25px]'>Bill To</h1>
                                        <div className='pt-[25px]'>
                                            <Label htmlFor="ClientName" className='pb-[9px]'>Client's Name</Label>
                                            <Input id="ClientName" />
                                        </div>
                                        <div className='pt-[25px]'>
                                            <Label htmlFor="ClientEmail" className='pb-[9px]'>Client's Email</Label>
                                            <Input id="ClientEmail" />
                                        </div>
                                        <div className='pt-[25px]'>
                                            <Label htmlFor="StreetAddress" className='pb-[9px]'>Street Addres</Label>
                                            <Input id="StreetAddress" />
                                        </div>
                                        <div>
                                            <div className='flex justify-center items-center gap-10'>
                                                <div className='pt-[25px]'>
                                                    <Label htmlFor="city" className='pb-[9px]'>City</Label>
                                                    <Input id="city" />
                                                </div>
                                                <div className='pt-[25px]'>
                                                    <Label htmlFor="postcode" className='pb-[9px]'>Post Code</Label>
                                                    <Input id="postcode" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pt-[25px]'>
                                            <Label htmlFor="Country" className='pb-[9px]'>Country</Label>
                                            <Input id="Country" />
                                        </div>
                                        <div className='pt-[25px]'>
                                            <Label className='pb-[9px]'>Payment Terms</Label>
                                            <DatePicker />
                                        </div>
                                    </form>
                                    <DialogClose>
                                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">İptal</button>
                                    </DialogClose>
                                </DialogContent>

                            </Dialog>
                        </div>

                    </div>
                </div>
                <div className='items-center justify-center flex-row h-full w-full px-[41px] pt-[81px]'>
                    <div className='items-center flex justify-center'>
                        <img src="flatline.svg" alt="flatline" />
                    </div>
                    <div className='items-center flex justify-center pt-[42px]'>
                        <h1 className='font-bold text-[24px] text-[#0C0E16]'>
                            There is nothing here
                        </h1>
                    </div>
                    <div className='items-center flex justify-center pt-[23px] text-center text-[#888EB0]'>
                        <p>Create an invoice by clicking the New button and get started</p>
                    </div>
                </div>
            </div>
        </>
    )
}