import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import readingTime from "reading-time"
import Disqus from "disqus-react"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { avatar } = this.props.data
    const { title, author, disqusShortname } = this.props.data.site.siteMetadata

    return (
      <Layout location={this.props.location} title={title}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1
          style={{
            ...scale(6 / 5),
          }}
        >
          {post.frontmatter.title}
        </h1>
        <div
          style={{
            display: `flex`,
          }}
        >
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt={author}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 50,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />

          <div>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
                color: "black",
              }}
            >
              {author}
            </p>
            <p
              style={{
                ...scale(-1.5 / 5),
                display: `block`,
                marginTop: rhythm(-1),
                color: "grey",
              }}
            >
              {post.frontmatter.date} &#183; {readingTime(post.html).text}
            </p>
          </div>
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
        <br />
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: rhythm(1),
            border: "1px solid #E3E3E3",
            borderRadius: rhythm(1 / 5),
          }}
        >
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={{
              url: this.props.location.href,
              identifier: this.props.location.pathname,
              title: post.frontmatter.title,
            }}
          />
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        author
        disqusShortname
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
