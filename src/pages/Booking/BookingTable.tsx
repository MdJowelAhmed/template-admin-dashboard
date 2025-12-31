import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Search, Filter, Plus, RefreshCw, Calendar, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { carBookingsData, statusFilterOptions } from './bookingData'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function BookingTable() {
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Filter data based on search and status
    const filteredData = useMemo(() => {
        return carBookingsData.filter((booking) => {
            const matchesSearch =
                booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                booking.id.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [searchQuery, statusFilter])

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredData.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredData, currentPage, itemsPerPage])

    const getStatusButton = (status: string) => {
        switch (status) {
            case 'Completed':
                return (
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white text-xs font-semibold w-[120px] justify-center">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Completed
                    </button>
                )
            case 'Runing':
                return (
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary-foreground text-white text-xs font-semibold w-[120px] justify-center">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
                        Runing
                    </button>
                )
            case 'Upcoming':
                return (
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-foreground text-white text-xs font-semibold w-[120px] justify-center">
                        <Calendar className="h-3.5 w-3.5" />
                        Upcoming
                    </button>
                )
            default:
                return null
        }
    }

    const getPaymentStatusBadge = (status: string) => {
        if (status === 'Paid') {
            return (
                <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                    {status}
                </span>
            )
        }
        return (
            <span className="bg-orange-50 text-orange-500 text-xs px-3 py-1 rounded-full font-medium">
                {status}
            </span>
        )
    }

    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            pages.push(1)
            if (currentPage > 3) pages.push('...')
            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                if (!pages.includes(i)) pages.push(i)
            }
            if (currentPage < totalPages - 2) pages.push('...')
            if (!pages.includes(totalPages)) pages.push(totalPages)
        }
        return pages
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
        >
            <Card className="bg-white border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <CardTitle className="text-xl font-bold text-slate-800">Car Bookings</CardTitle>
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search client name & car etc."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-[220px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[120px] bg-primary text-white border-0">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusFilterOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Add Bookings Button */}
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Bookings
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="w-full overflow-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="bg-[#E2FBFB] text-slate-800">
                                    <th className="px-6 py-4 text-left text-sm font-bold">Booking ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold">Client Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold">Car Model</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold">Plan</th>
                                    <th className="px-6 py-4 text-center text-sm font-bold">payment</th>
                                    <th className="px-6 py-4 text-right text-sm font-bold">status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-accent-foreground">
                                {paginatedData.map((booking, index) => (
                                    <motion.tr
                                        key={`${booking.id}-${index}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * index }}
                                        className="hover:bg-gray-50/50"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                                            {booking.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-accent-foreground w-8">Start</span>
                                                    <span className="bg-secondary text-white px-3 py-1 rounded text-[11px] font-medium min-w-[80px] text-center">
                                                        {booking.startDate}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-accent-foreground w-8">End</span>
                                                    <span className="bg-primary-foreground text-white px-3 py-1 rounded text-[11px] font-medium min-w-[80px] text-center">
                                                        {booking.endDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                                            {booking.clientName}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-medium text-slate-700">{booking.carModel}</span>
                                                <span className="bg-gray-100 text-accent-foreground text-xs px-2 py-0.5 rounded w-fit">
                                                    {booking.licensePlate}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700 font-medium">
                                            {booking.plan}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-sm font-semibold text-slate-700">{booking.payment}</span>
                                                {getPaymentStatusBadge(booking.paymentStatus)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {getStatusButton(booking.status)}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Result Per Page</span>
                            <Select value={String(itemsPerPage)} onValueChange={(val) => setItemsPerPage(Number(val))}>
                                <SelectTrigger className="w-[70px] h-8">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {[10, 20, 50].map((option) => (
                                        <SelectItem key={option} value={String(option)}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="text-gray-600"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Prev
                            </Button>

                            <div className="flex items-center gap-1">
                                {getPageNumbers().map((page, index) =>
                                    typeof page === 'number' ? (
                                        <Button
                                            key={index}
                                            variant={currentPage === page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 ${currentPage === page ? 'bg-primary text-white' : 'text-gray-600'}`}
                                        >
                                            {page}
                                        </Button>
                                    ) : (
                                        <span key={index} className="px-2 text-gray-400">
                                            {page}
                                        </span>
                                    )
                                )}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="text-gray-600"
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
