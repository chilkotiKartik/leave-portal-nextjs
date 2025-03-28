"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Share2 } from "lucide-react"

type Post = {
  id: string
  author: {
    name: string
    avatar?: string
    role: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
  type: "announcement" | "general" | "event"
}

const posts: Post[] = [
  {
    id: "p1",
    author: {
      name: "Admin",
      avatar: "/images/admin-avatar.png",
      role: "Administrator",
    },
    content:
      "Important Announcement: The deadline for submitting leave applications for the upcoming holiday season is October 15th. Please ensure you submit your applications before the deadline.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    isLiked: false,
    type: "announcement",
  },
  {
    id: "p2",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/avatar-1.png",
      role: "Student",
    },
    content: "Just got my leave application approved in less than an hour! The new automated system is amazing. 👍",
    timestamp: "1 day ago",
    likes: 42,
    comments: 8,
    isLiked: true,
    type: "general",
  },
  {
    id: "p3",
    author: {
      name: "Events Committee",
      avatar: "/images/events-avatar.png",
      role: "Organization",
    },
    content:
      "Upcoming Event: Join us for the Annual Student Festival on November 5th. There will be music, food, and fun activities. Don't miss out!",
    timestamp: "3 days ago",
    likes: 87,
    comments: 12,
    isLiked: false,
    type: "event",
  },
]

export function SocialFeed() {
  const [allPosts, setAllPosts] = useState<Post[]>(posts)
  const [newPost, setNewPost] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPosts = activeTab === "all" ? allPosts : allPosts.filter((post) => post.type === activeTab)

  const handleLike = (postId: string) => {
    setAllPosts(
      allPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const newPostObj: Post = {
      id: `p${allPosts.length + 1}`,
      author: {
        name: "John Doe",
        avatar: "/images/avatar-placeholder.png",
        role: "Student",
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
      type: "general",
    }

    setAllPosts([newPostObj, ...allPosts])
    setNewPost("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Feed</CardTitle>
        <CardDescription>Stay connected with announcements and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <Textarea
              placeholder="Share something with the community..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-4 resize-none"
            />
            <div className="flex justify-end">
              <Button onClick={handlePostSubmit}>Post</Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="announcement">Announcements</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="space-y-4 pt-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={post.author.avatar || "/images/avatar-placeholder.png"}
                          alt={post.author.name}
                        />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {post.author.role} • {post.timestamp}
                            </p>
                          </div>
                          {post.type === "announcement" && (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              Announcement
                            </span>
                          )}
                          {post.type === "event" && (
                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                              Event
                            </span>
                          )}
                        </div>
                        <p className="text-sm">{post.content}</p>
                        <div className="flex items-center space-x-4 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-muted-foreground"
                            onClick={() => handleLike(post.id)}
                          >
                            {post.isLiked ? (
                              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                            ) : (
                              <Heart className="h-4 w-4" />
                            )}
                            <span>{post.likes}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-muted-foreground"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center space-x-1 text-muted-foreground"
                          >
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No posts to display</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button variant="outline" className="w-full">
          Load More
        </Button>
      </CardFooter>
    </Card>
  )
}

