"use client"

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";


export default function Invoices() {
    const [items, setItems] = useState([
        { id: Date.now(), name: "", quantity: 1, price: 0 },
    ]);
    const [cards, setCards] = useState([]);

    const handleAddItem = () => {
        setItems((prev) => [
            ...prev,
            { id: Date.now(), name: "", quantity: 1, price: 0 },
        ]);
    };

    const handleChange = (id, field, value) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        [field]: field === "name" ? value : Number(value),
                    }
                    : item
            )
        );
    };

    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const saveCard = (status) => {
        const invoice = {
            id: Date.now(),
            status, // "draft", "sent", "discarded"
            items: items.map((item) => ({
                ...item,
                total: (item.quantity * item.price).toFixed(2),
            })),
        };

        setCards((prev) => [...prev, invoice]);
        setItems([{ id: Date.now(), name: "", quantity: 1, price: 0 }]);
    };
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
                        <div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="flex items-center gap-2 bg-[#7B5CFF] text-white font-bold pl-2 pr-4 py-2 rounded-full shadow hover:bg-[#6A4DE0] transition">
                                        <span className="bg-white text-[#7B5CFF] rounded-full w-8 h-8 flex justify-center text-lg font-bold">
                                            +
                                        </span>
                                        <p className='text-[17px]'>New</p>
                                    </button>
                                </DialogTrigger>
                                <DialogContent className='overflow-y-auto max-h-full max-w-full'>
                                    <form>
                                        <div className=''>
                                            <Label htmlFor="street" className='pb-[9px]'>Street Adress</Label>
                                            <Input id="street" />
                                        </div>
                                        <div>
                                            <div className='flex justify-center items-center gap-10'>
                                                <div className='pt-[25px]'>
                                                    <Label htmlFor="city" className='pb-[9px]' >City</Label>
                                                    <Input id="city" />
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
                                            <Label className='pb-[9px]'>Invoice Date</Label>
                                            <DatePicker />
                                        </div>
                                        <div className='pt-[25px]'>
                                            <Label htmlFor="Project" className='pb-[9px]'>Project Description</Label>
                                            <Input id="Project" />
                                        </div>
                                        <div className="pt-10">
                                            <h1 className="text-md font-semibold mb-4 text-[#7C5DFA]">Item List</h1>

                                            {items.map((item) => {
                                                const total = (item.quantity * item.price).toFixed(2);

                                                return (
                                                    <div key={item.id} className="mb-10">
                                                        {/* Item Name */}
                                                        <div className="mb-3">
                                                            <Label
                                                                htmlFor={`item-name-${item.id}`}
                                                                className="text-sm text-[#7E88C3] mb-1 block"
                                                            >
                                                                Item Name
                                                            </Label>
                                                            <Input
                                                                id={`item-name-${item.id}`}
                                                                value={item.name}
                                                                onChange={(e) => handleChange(item.id, "name", e.target.value)}
                                                                className="font-semibold"
                                                            />
                                                        </div>

                                                        {/* Qty, Price, Total */}
                                                        <div className="flex items-end justify-between gap-4">
                                                            {/* Qty */}
                                                            <div className="flex flex-col">
                                                                <Label className="text-xs text-[#7E88C3] mb-1">Qty.</Label>
                                                                <Input
                                                                    type="number"
                                                                    min="0"
                                                                    value={item.quantity}
                                                                    onChange={(e) =>
                                                                        handleChange(item.id, "quantity", e.target.value)
                                                                    }
                                                                    className="w-16 text-center"
                                                                />
                                                            </div>

                                                            {/* Price */}
                                                            <div className="flex flex-col">
                                                                <Label className="text-xs text-[#7E88C3] mb-1">Price</Label>
                                                                <Input
                                                                    type="number"
                                                                    min="0"
                                                                    value={item.price}
                                                                    onChange={(e) =>
                                                                        handleChange(item.id, "price", e.target.value)
                                                                    }
                                                                    className="w-24 text-center font-semibold"
                                                                />
                                                            </div>

                                                            {/* Total */}
                                                            <div className="flex flex-col">
                                                                <Label className="text-xs text-[#7E88C3] mb-1">Total</Label>
                                                                <p className="text-[#888EB0] font-semibold pt-1 w-20">
                                                                    {total}
                                                                </p>
                                                            </div>

                                                            {/* Delete */}
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDelete(item.id)}
                                                                className="mt-4"
                                                            >
                                                                <Trash2 className="w-5 h-5 text-[#888EB0]" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Add New Item Button */}
                                            <div className="pt-6">
                                                <Button
                                                    onClick={handleAddItem}
                                                    type="button"
                                                    className="w-full bg-[#F9FAFE] text-[#7C5DFA] hover:bg-[#EFEDFD] font-semibold rounded-full"
                                                    variant="ghost"
                                                >
                                                    + Add New Item
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="flex justify-end gap-4 mt-10">
                                        {/* Discard */}
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="bg-white text-[#7C5DFA] border border-transparent hover:bg-gray-100 px-6 py-2 rounded-full font-medium"
                                                onClick={() => saveCard("discarded")}
                                            >
                                                Discard
                                            </Button>
                                        </DialogClose>


                                        {/* Save as Draft */}
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                className="bg-[#373B53] text-[#DFE3FA] hover:bg-[#1E2139] px-6 py-2 rounded-full font-medium"
                                                onClick={() => saveCard("draft")}
                                            >
                                                Save as Draft
                                            </Button>
                                        </DialogClose>

                                        {/* Save & Send */}
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                className="bg-[#7C5DFA] text-white hover:bg-[#6A4DE0] px-6 py-2 rounded-full font-medium"
                                                onClick={() => saveCard("sent")}
                                            >
                                                Save & Send
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </DialogContent>

                            </Dialog>
                        </div>


                    </div>
                </div>
                <div className='items-center justify-center flex-col h-full w-full px-[41px] pt-[81px]'>
                    {cards.length === 0 ? (
                        <>
                            <div className='flex justify-center'>
                                <img src="flatline.svg" alt="flatline" />
                            </div>
                            <div className='flex justify-center pt-[42px]'>
                                <h1 className='font-bold text-[24px] text-[#0C0E16]'>
                                    There is nothing here
                                </h1>
                            </div>
                            <div className='flex justify-center pt-[23px] text-center text-[#888EB0]'>
                                <p>Create an invoice by clicking the New button and get started</p>
                            </div>
                        </>
                    ) : (
                        <div className="grid gap-4">
                            {cards.map((card) => {
                                const totalAmount = card.items.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                ).toFixed(2);

                                const statusColor = {
                                    sent: "bg-green-100 text-green-700",
                                    draft: "bg-gray-200 text-gray-700",
                                    pending: "bg-orange-100 text-orange-700",
                                    discarded: "bg-red-100 text-red-700",
                                }[card.status] || "bg-gray-200 text-gray-700";

                                return (
                                    <div
                                        key={card.id}
                                        className="flex justify-between items-center  p-6 rounded-lg"
                                    >
                                        {/* Left Side */}
                                        <div>
                                            <p className="font-bold text-base mb-1">#{card.id.toString().slice(-5)}</p>
                                            <p className="text-sm ">
                                                Due {new Date().toISOString().slice(0, 10)}
                                            </p>
                                            <p className="text-lg font-semibold pt-2">£ {totalAmount}</p>
                                        </div>

                                        {/* Right Side */}
                                        <div className="flex flex-col items-end gap-2">
                                            <p className="text-sm ">John Doe</p>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                                                {card.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}