'use client';

import { useParams } from "next/navigation";

export default function HelloId() {
    const {id} = useParams<{id:string}>();
    return `Hello, id is ${id}`
}