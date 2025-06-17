import React from 'react';
import Link from 'next/link'

interface BreadcrumbProps {
    links: { label: string, url: string }[];
}

export default function BreadcrumbComponent({ links }: BreadcrumbProps) {

    return (
        <nav aria-label="breadcrumb">
            {links.map((link, index) => (
                <span key={index}>
                    <Link href={link.url} aria-label={"lien vers les élements de l'url"}
                          className={"hover:underline  font-bold tendre-black"}>
                        {link.label}
                    </Link>
                    {index < links.length - 1 && ' / '}
                </span>
            ))}
        </nav>
    );
};
