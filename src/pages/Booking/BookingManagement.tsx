import { BookingStatCard } from './BookingStatCard'
import { BookingTable } from './BookingTable'

const BookingManagement = () => {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <BookingStatCard />

            {/* Bookings Table */}
            <BookingTable />
        </div>
    )
}

export default BookingManagement