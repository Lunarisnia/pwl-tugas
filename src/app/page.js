"use client"
// import Image from "next/image";
import styles from "./page.module.css";
import {Button, Input, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import {useEffect, useState} from "react";
// import {cookies} from "next/headers";

export default function Home() {
    const [donated, setDonated] = useState("");
    const [borrower, setBorrower] = useState("");
    const [borrowedBook, setBorrowedBook] = useState("");
    const [database, setDatabase] = useState({
        "borrowed": [],
        "added_book": [],
        "books": ["Buku A", "Buku B", "Buku C"]
    });
    // const cookieStore = Cookie();
    useEffect(() => {
        const db = localStorage.getItem("database");
        if (!db) {
            localStorage.setItem("database", JSON.stringify({
                "borrowed": [],
                "added_book": [],
                "books": ["Buku A", "Buku B", "Buku C"]
            }))
        }

        setDatabase(JSON.parse(db))
    }, []);

    return (
        <main className={styles.main}>
            <h2>Nama: Rio Arswendo Rachmad (202143500473)</h2>
            <h2>Kelas: S6E</h2>
            <h2>Donasi Buku</h2>
            <TextField variant="outlined" label="Judul Buku" onChange={(e) => setDonated(e.target.value)}/>
            <Button variant="contained" onClick={() => {
                if (donated === "") {
                    return;
                }
                const newDb = {
                    "borrowed": [...database.borrowed],
                    "added_book": [...database.added_book, donated],
                    "books": ["Buku A", "Buku B", "Buku C"]
                };
                localStorage.setItem("database", JSON.stringify(newDb))
                setDatabase(newDb);
            }}>Donasi</Button>
            <h2>List Buku</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nama Buku</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...database.books, ...database.added_book].map((b, i) => (
                        <TableRow key={i}>
                            <TableCell>{b}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <h2>Buku Apapun Ada</h2>
            <TextField variant="outlined" label="Nama Peminjam" onChange={(e) => {
                setBorrower(e.target.value)
            }}/>
            <TextField variant="outlined" label="Nama Buku" onChange={(e) => {
                setBorrowedBook(e.target.value)
            }}/>
            <Button variant="contained" onClick={() => {
                if (borrower === "" || borrowedBook === "") {
                    return;
                }
                const newDb = {
                    "borrowed": [...database.borrowed, {
                        "name": borrower,
                        "bookName": borrowedBook,
                    }],
                    "added_book": [...database.added_book],
                    "books": ["Buku A", "Buku B", "Buku C"]
                };
                localStorage.setItem("database", JSON.stringify(newDb))
                setDatabase(newDb);
            }}>Pinjam</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Peminjam</TableCell>
                        <TableCell>Nama Buku</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {database.borrowed.map((b, i) => (
                        <TableRow key={i}>
                            <TableCell>{b.name}</TableCell>
                            <TableCell>{b.bookName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
}
