import { useEffect, useState } from "react";
import "./Overview.scss";
import {
    Users,
    Briefcase,
    Clock,
    CheckCircle,
    TrendingUp,
    Star,
    MapPin,
    Activity,
    UserCheck,
    XCircle,
    Award,
    Calendar,
} from "lucide-react";
import type { TProfessionalService } from "../../../../utils/types/profServiceTypes";
import {
    getAllProfServices,
    getAllUsers,
} from "../../../../services/adminServices";
import { Link } from "react-router-dom";

type TUser = {
    _id: string;
    name: string;
    email: string;
    isVerified?: boolean;
    status?: string;
    createdAt?: string;
};

const DashboardOverview = () => {
    const [users, setUsers] = useState<TUser[]>([]);
    const [services, setServices] = useState<TProfessionalService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [usersRes, servicesRes] = await Promise.all([
                    getAllUsers(),
                    getAllProfServices(),
                ]);
                setUsers(usersRes);
                setServices(servicesRes);
            } catch (err) {
                console.error("Failed to load dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Calculate statistics
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "active").length;
    const verifiedUsers = users.filter((u) => u.isVerified).length;

    const totalServices = services.length;
    const pendingServices = services.filter(
        (s) => s.isApproved?.toLowerCase() === "pending"
    ).length;
    const approvedServices = services.filter(
        (s) => s.isApproved?.toLowerCase() === "approved"
    ).length;
    const rejectedServices = services.filter(
        (s) => s.isApproved?.toLowerCase() === "rejected" || s.isApproved?.toLowerCase() === "reject"
    ).length;

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = users.filter(
        (u) => u.createdAt && new Date(u.createdAt) > sevenDaysAgo
    ).length;

    // Category breakdown
    const categoryCount: { [key: string]: number } = {};
    services.forEach((s) => {
        if (s.category) {
            categoryCount[s.category] = (categoryCount[s.category] || 0) + 1;
        }
    });
    const topCategories = Object.entries(categoryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    // Calculate average rating
    const servicesWithRatings = services.filter(
        (s) => s.ratings && s.ratings.length > 0
    );
    const totalRatings = servicesWithRatings.reduce((sum, s) => {
        const avg =
            s.ratings!.reduce((acc, r) => acc + (r.rating || 0), 0) /
            s.ratings!.length;
        return sum + avg;
    }, 0);
    const averageRating = servicesWithRatings.length
        ? (totalRatings / servicesWithRatings.length).toFixed(1)
        : "0.0";

    // Get top rated services
    const topRatedServices = [...services]
        .filter((s) => s.ratings && s.ratings.length > 0)
        .map((s) => ({
            ...s,
            avgRating:
                s.ratings!.reduce((acc, r) => acc + (r.rating || 0), 0) /
                s.ratings!.length,
        }))
        .sort((a, b) => b.avgRating - a.avgRating)
        .slice(0, 5);

    // Recent services
    const recentServices = [...services]
        .sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, 5);

    if (loading) {
        return (
            <div className="dashboard-overview">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-overview">
            {/* Header */}
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard Overview</h1>
                    <p className="subtitle">
                        Welcome back! Here's what's happening with your platform.
                    </p>
                </div>
                <div className="header-actions">
                    <div className="date-badge">
                        <Calendar size={16} />
                        {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card gradient-blue">
                    <div className="stat-header">
                        <div className="icon-wrapper">
                            <Users size={24} />
                        </div>
                        <div className="trend-badge positive">
                            <TrendingUp size={14} />
                            <span>+{recentUsers} this week</span>
                        </div>
                    </div>
                    <Link to='/admin/users'>
                        <div className="stat-content">
                            <h2>{totalUsers}</h2>
                            <p>Total Users</p>
                        </div></Link>
                    <div className="stat-footer">
                        <div className="mini-stat">
                            <UserCheck size={14} />
                            <span>{activeUsers} active</span>
                        </div>
                        <div className="mini-stat">
                            <CheckCircle size={14} />
                            <span>{verifiedUsers} verified</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card gradient-green">
                    <div className="stat-header">
                        <div className="icon-wrapper">
                            <Briefcase size={24} />
                        </div>
                        <div className="trend-badge">
                            <Activity size={14} />
                            <span>{approvedServices} active</span>
                        </div>
                    </div>
                    <Link to='/admin/prof-services'>
                        <div className="stat-content">
                            <h2>{totalServices}</h2>
                            <p>Professional Services</p>
                        </div></Link>
                    <div className="stat-footer">
                        <div className="mini-stat">
                            <CheckCircle size={14} />
                            <span>{approvedServices} approved</span>
                        </div>
                        <div className="mini-stat">
                            <XCircle size={14} />
                            <span>{rejectedServices} rejected</span>
                        </div>
                    </div>
                </div>

                <div className="stat-card gradient-orange">
                    <div className="stat-header">
                        <div className="icon-wrapper">
                            <Clock size={24} />
                        </div>
                        {pendingServices > 0 && (
                            <div className="trend-badge warning">
                                <span>Needs attention</span>
                            </div>
                        )}
                    </div>
                    <div className="stat-content">
                        <h2>{pendingServices}</h2>
                        <p>Pending Approvals</p>
                    </div>
                    <div className="stat-footer">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${totalServices > 0 ? (pendingServices / totalServices) * 100 : 0}%`,
                                }}
                            />
                        </div>
                        <span className="progress-text">
                            {totalServices > 0
                                ? ((pendingServices / totalServices) * 100).toFixed(0)
                                : 0}
                            % of total
                        </span>
                    </div>
                </div>

                <div className="stat-card gradient-purple">
                    <div className="stat-header">
                        <div className="icon-wrapper">
                            <Star size={24} />
                        </div>
                        <div className="trend-badge positive">
                            <Award size={14} />
                            <span>Excellent</span>
                        </div>
                    </div>
                    <div className="stat-content">
                        <h2>{averageRating}</h2>
                        <p>Average Rating</p>
                    </div>
                    <div className="stat-footer">
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={14}
                                    fill={
                                        star <= parseFloat(averageRating) ? "#fbbf24" : "transparent"
                                    }
                                    color="#fbbf24"
                                />
                            ))}
                        </div>
                        <span>{servicesWithRatings.length} rated services</span>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-column">
                    {/* Category Breakdown */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>
                                <MapPin size={20} />
                                Top Service Categories
                            </h3>
                            <span className="badge-info">{topCategories.length} categories</span>
                        </div>
                        <div className="card-body">
                            {topCategories.length > 0 ? (
                                <div className="category-list">
                                    {topCategories.map(([category, count], index) => (
                                        <div key={category} className="category-item">
                                            <div className="category-info">
                                                <span className="rank">#{index + 1}</span>
                                                <span className="category-name">{category}</span>
                                            </div>
                                            <div className="category-stats">
                                                <div className="category-bar">
                                                    <div
                                                        className="category-fill"
                                                        style={{
                                                            width: `${(count / totalServices) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="category-count">{count}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state-small">No categories yet</div>
                            )}
                        </div>
                    </div>

                    {/* Recent Services */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>
                                <Activity size={20} />
                                Recent Services
                            </h3>
                            <span className="badge-info">Latest additions</span>
                        </div>
                        <div className="card-body">
                            {recentServices.length > 0 ? (
                                <div className="recent-list">
                                    {recentServices.map((service) => (
                                        <div key={service._id} className="recent-item">
                                            {service.coverImage ? (
                                                <img
                                                    src={service.coverImage}
                                                    alt={service.category}
                                                    className="recent-thumb"
                                                />
                                            ) : (
                                                <div className="recent-thumb-placeholder">
                                                    <Briefcase size={16} />
                                                </div>
                                            )}
                                            <div className="recent-info">
                                                <div className="recent-name">{service.category}</div>
                                                <div className="recent-meta">
                                                    <MapPin size={12} />
                                                    {service.addressLine || "No location"}
                                                </div>
                                            </div>
                                            <span
                                                className={`badge badge-${service.isApproved?.toLowerCase() === "approved"
                                                    ? "approved"
                                                    : service.isApproved?.toLowerCase() === "pending"
                                                        ? "pending"
                                                        : "rejected"
                                                    }`}
                                            >
                                                {service.isApproved}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state-small">No services yet</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-column">
                    {/* Top Rated Services */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>
                                <Star size={20} />
                                Top Rated Services
                            </h3>
                            <span className="badge-info">Highest ratings</span>
                        </div>
                        <div className="card-body">
                            {topRatedServices.length > 0 ? (
                                <div className="rated-list">
                                    {topRatedServices.map((service, index) => (
                                        <div key={service._id} className="rated-item">
                                            <div className="rated-rank">#{index + 1}</div>
                                            {service.coverImage ? (
                                                <img
                                                    src={service.coverImage}
                                                    alt={service.category}
                                                    className="rated-thumb"
                                                />
                                            ) : (
                                                <div className="rated-thumb-placeholder">
                                                    <Briefcase size={16} />
                                                </div>
                                            )}
                                            <div className="rated-info">
                                                <div className="rated-name">{service.category}</div>
                                                <div className="rated-rating">
                                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                                    <span>{service.avgRating.toFixed(1)}</span>
                                                    <span className="rated-reviews">
                                                        ({service.ratings?.length || 0} reviews)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state-small">No ratings yet</div>
                            )}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>
                                <Activity size={20} />
                                Platform Statistics
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="quick-stats">
                                <div className="quick-stat-item">
                                    <div className="quick-stat-icon blue">
                                        <Users size={20} />
                                    </div>
                                    <div className="quick-stat-info">
                                        <span className="quick-stat-value">{verifiedUsers}</span>
                                        <span className="quick-stat-label">Verified Users</span>
                                    </div>
                                    <div className="quick-stat-percent">
                                        {totalUsers > 0
                                            ? ((verifiedUsers / totalUsers) * 100).toFixed(0)
                                            : 0}
                                        %
                                    </div>
                                </div>

                                <div className="quick-stat-item">
                                    <div className="quick-stat-icon green">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div className="quick-stat-info">
                                        <span className="quick-stat-value">{approvedServices}</span>
                                        <span className="quick-stat-label">Active Services</span>
                                    </div>
                                    <div className="quick-stat-percent">
                                        {totalServices > 0
                                            ? ((approvedServices / totalServices) * 100).toFixed(0)
                                            : 0}
                                        %
                                    </div>
                                </div>

                                <div className="quick-stat-item">
                                    <div className="quick-stat-icon orange">
                                        <Clock size={20} />
                                    </div>
                                    <div className="quick-stat-info">
                                        <span className="quick-stat-value">{pendingServices}</span>
                                        <span className="quick-stat-label">Awaiting Review</span>
                                    </div>
                                    <div className="quick-stat-percent">
                                        {totalServices > 0
                                            ? ((pendingServices / totalServices) * 100).toFixed(0)
                                            : 0}
                                        %
                                    </div>
                                </div>

                                <div className="quick-stat-item">
                                    <div className="quick-stat-icon purple">
                                        <Star size={20} />
                                    </div>
                                    <div className="quick-stat-info">
                                        <span className="quick-stat-value">
                                            {servicesWithRatings.length}
                                        </span>
                                        <span className="quick-stat-label">Rated Services</span>
                                    </div>
                                    <div className="quick-stat-percent">
                                        {totalServices > 0
                                            ? ((servicesWithRatings.length / totalServices) * 100).toFixed(0)
                                            : 0}
                                        %
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;