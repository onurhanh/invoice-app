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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";


export default function Invoices() {
    const [items, setItems] = useState([
        { id: Date.now(), name: "", quantity: 1, price: 0 },
    ]);
    const [cards, setCards] = useState([]);

    const [formValues, setFormValues] = useState({
        street: "",
        city: "",
        postcode: "",
        ClientName: "",
        ClientEmail: "",
        StreetAddress: "",
        Country: "",
        Project: "",
        city2: "",
        datePicker: "",
        name: "",
    });

    const [errors, setErrors] = useState({});



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

    const saveCard = (status, e) => {
        e.preventDefault();

        const itemErrors = {};
        const newErrors = {};

        Object.entries(formValues).forEach(([key, value]) => {
            if (!value.trim()) {
                newErrors[key] = true;
            }
        });

        items.forEach((item) => {
            if (!item.name.trim()) {
                if (!newErrors.items) newErrors.items = {};
                newErrors.items[item.id] = {
                    ...newErrors.items[item.id],
                    name: "Bu alan zorunludur.",
                };
            }

            if (item.quantity <= 0 || isNaN(item.quantity)) {
                if (!newErrors.items) newErrors.items = {};
                newErrors.items[item.id] = {
                    ...newErrors.items[item.id],
                    quantity: "Geçerli bir miktar girin.",
                };
            }
            if (item.price <= 0 || isNaN(item.price)) {
                if (!newErrors.items) newErrors.items = {};
                newErrors.items[item.id] = {
                    ...newErrors.items[item.id],
                    price: "Fiyat 0'dan büyük olmalıdır.",
                };
            }
        });


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({}); // temizle

        const invoice = {
            id: Date.now(),
            status,
            items: items.map((item) => ({
                ...item,
                total: (item.quantity * item.price).toFixed(2),
            })),
        };

        setCards((prev) => [...prev, invoice]);
        setItems([{ id: Date.now(), name: "", quantity: 1, price: 0 }]);

        // formu temizle
        setFormValues({
            street: "",
            city: "",
            postcode: "",
            ClientName: "",
            ClientEmail: "",
            StreetAddress: "",
            Country: "",
            Project: "",
            city2: "",
            datePicker: "",
            name: "",
        });
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
                                    <DialogHeader>
                                        <VisuallyHidden>
                                            <DialogTitle>Yeni Dialog</DialogTitle>
                                        </VisuallyHidden>
                                    </DialogHeader>
                                    <form>
                                        <div>
                                            <Label className="pb-[15px]" htmlFor="street">Street Address</Label>
                                            <Input
                                                id="street"
                                                value={formValues.street}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, street: e.target.value }))}
                                                className={errors.street ? "border-red-500" : ""}
                                            />
                                            {errors.street && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className='flex justify-center items-center gap-10'>
                                                <div className="pt-[25px]">
                                                    <Label htmlFor="city" className='pb-[9px]' >City</Label>
                                                    <Input
                                                        id="city"
                                                        value={formValues.city}
                                                        onChange={(e) => setFormValues((prev) => ({ ...prev, city: e.target.value }))}
                                                        className={errors.city ? "border-red-500" : ""}
                                                    />
                                                    {errors.city && (
                                                        <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                                    )}
                                                </div>
                                                <div className="pt-[25px]">
                                                    <Label htmlFor="postcode" className='pb-[9px]' >Post Code</Label>
                                                    <Input
                                                        id="postcode"
                                                        value={formValues.postcode}
                                                        onChange={(e) => setFormValues((prev) => ({ ...prev, postcode: e.target.value }))}
                                                        className={errors.postcode ? "border-red-500" : ""}
                                                    />
                                                    {errors.postcode && (
                                                        <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-[25px]">
                                            <Label htmlFor="StreetAddress" className='pb-[9px]' >Street Adress</Label>
                                            <Input
                                                id="StreetAddress"
                                                value={formValues.StreetAddress}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, StreetAddress: e.target.value }))}
                                                className={errors.StreetAddress ? "border-red-500" : ""}
                                            />
                                            {errors.StreetAddress && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
                                        </div>
                                        <h1 className='pt-[25px]'>Bill To</h1>
                                        <div className="pt-[25px]">
                                            <Label htmlFor="ClientName" className='pb-[9px]' >Client's Name</Label>
                                            <Input
                                                id="ClientName"
                                                value={formValues.ClientName}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, ClientName: e.target.value }))}
                                                className={errors.ClientName ? "border-red-500" : ""}
                                            />
                                            {errors.ClientName && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
                                        </div>
                                        <div className="pt-[25px]">
                                            <Label htmlFor="ClientEmail" className='pb-[9px]' >Client's Email</Label>
                                            <Input
                                                id="ClientEmail"
                                                value={formValues.ClientEmail}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, ClientEmail: e.target.value }))}
                                                className={errors.ClientEmail ? "border-red-500" : ""}
                                            />
                                            {errors.ClientEmail && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
                                        </div>
                                        <div className="pt-[25px]">
                                            <Label htmlFor="StreetAddress" className='pb-[9px]' >Street Address</Label>
                                            <Input
                                                id="StreetAddress"
                                                value={formValues.StreetAddress}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, StreetAddress: e.target.value }))}
                                                className={errors.StreetAddress ? "border-red-500" : ""}
                                            />
                                            {errors.StreetAddress && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
                                        </div>
                                        <div>
                                            <div className='flex justify-center items-center gap-10'>
                                                <div className="pt-[25px]">
                                                    <Label htmlFor="city2" className='pb-[9px]' >City</Label>
                                                    <Input
                                                        id="city2"
                                                        value={formValues.city2}
                                                        onChange={(e) => setFormValues((prev) => ({ ...prev, city2: e.target.value }))}
                                                        className={errors.city2 ? "border-red-500" : ""}
                                                    />
                                                    {errors.city2 && (
                                                        <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                                    )}
                                                </div>
                                                <div className="pt-[25px]">
                                                    <Label htmlFor="postcode" className='pb-[9px]' >Post Code</Label>
                                                    <Input
                                                        id="postcode"
                                                        value={formValues.postcode}
                                                        onChange={(e) => setFormValues((prev) => ({ ...prev, postcode: e.target.value }))}
                                                        className={errors.postcode ? "border-red-500" : ""}
                                                    />
                                                    {errors.postcode && (
                                                        <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-[25px]">
                                            <Label htmlFor="Country" className='pb-[9px]' >Country</Label>
                                            <Input
                                                id="Country"
                                                value={formValues.Country}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, Country: e.target.value }))}
                                                className={errors.Country ? "border-red-500" : ""}
                                            />
                                            {errors.Country && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
                                        </div>
                                        <div className='pt-[25px]'>
                                            <Label htmlFor="datePicker" className='pb-[9px]'>Invoice Date</Label>
                                            <DatePicker
                                                id="datePicker"
                                                value={formValues.datePicker}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, datePicker: e.target.value }))}
                                                className={errors.datePicker ? "border-red-500" : ""} />
                                            {errors.datePicker && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
                                        </div>
                                        <div className="pt-[25px]">
                                            <Label htmlFor="Project" className='pb-[9px]' >Project Description</Label>
                                            <Input
                                                id="Project"
                                                value={formValues.Project}
                                                onChange={(e) => setFormValues((prev) => ({ ...prev, Project: e.target.value }))}
                                                className={errors.Project ? "border-red-500" : ""}
                                            />
                                            {errors.Project && (
                                                <p className="text-red-500 text-sm mt-1">Bu alan zorunludur.</p>
                                            )}
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
                                                                className={`font-semibold ${errors.items?.[item.id] ? "border-red-500" : ""
                                                                    }`}
                                                            />
                                                            {errors.items?.[item.id]?.name && (
                                                                <p className="text-red-500 text-sm mt-1">
                                                                    {errors.items[item.id].name}
                                                                </p>)}

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
                                                                    className={`w-16 text-center ${errors.items?.[item.id]?.quantity ? "border-red-500" : ""
                                                                        }`}
                                                                />
                                                                {errors.items?.[item.id]?.quantity && (
                                                                    <p className="text-red-500 text-xs mt-1">
                                                                        {errors.items[item.id].quantity}
                                                                    </p>
                                                                )}
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
                                                                    className={`w-24 text-center font-semibold ${errors.items?.[item.id]?.price ? "border-red-500" : ""
                                                                        }`}
                                                                />
                                                                {errors.items?.[item.id]?.price && (
                                                                    <p className="text-red-500 text-sm mt-1">
                                                                        {errors.items[item.id].price}
                                                                    </p>
                                                                )}
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
                                                    onClick={(e) => saveCard("sent", e)}
                                                >
                                                    Save & Send
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    </form>
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