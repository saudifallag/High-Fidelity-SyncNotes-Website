import { PublicHeader } from '@/components/PublicHeader'
import { PublicFooter } from '@/components/PublicFooter'
import { ModalProvider } from '@/context/ModalContext'
import { PublicModals } from '@/components/PublicModals'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ModalProvider>
            <div className="min-h-screen flex flex-col">
                <PublicHeader />
                <main className="flex-1">
                    {children}
                </main>
                <PublicFooter />
                <PublicModals />
            </div>
        </ModalProvider>
    )
}
