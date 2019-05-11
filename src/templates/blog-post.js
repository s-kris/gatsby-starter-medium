import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import readingTime from "reading-time"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { avatar } = this.props.data
    const { title, author } = this.props.data.site.siteMetadata
    const { previous, next } = this.props.pageContext

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

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
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
